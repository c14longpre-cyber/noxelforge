// Backlink exchanges: member actions, server-side link check, daily cron (expiry, grace, rompu),
// matchmaking exclusion and routes. Fake Supabase and fake fetch: no network.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import type { AddressInfo } from "node:net";

process.env.FORGE_JWT_SECRET = "test-secret";
process.env.ANTHROPIC_API_KEY ??= "test";

const require = createRequire(import.meta.url);
const express = require("express");
const cookieParser = require("cookie-parser");
const supabaseClient = require("../dist/lib/supabaseClient.js");
const ex = require("../dist/services/forge/exchanges.service.js");
const { getRecommendedPartners } = require("../dist/services/forge/matchmaking.service.js");
const { createSession } = require("../dist/services/session.js");

// ─── Fake Supabase ──────────────────────────────────────────────────────────
type Row = Record<string, any>;
let tables: Record<string, Row[]> = {};
let nextId = 1;
supabaseClient.getSupabase = () => ({
  from(table: string) {
    const preds: ((r: Row) => boolean)[] = [];
    let op = "select"; let payload: Row | null = null;
    const rows = () => (tables[table] ??= []);
    const run = () => {
      if (op === "insert") { const r = { id: `ex-${nextId++}`, ...payload }; rows().push(r); return { data: [r], error: null }; }
      const m = rows().filter((r) => preds.every((p) => p(r)));
      if (op === "update") { m.forEach((r) => Object.assign(r, payload)); return { data: m, error: null }; }
      return { data: m, error: null };
    };
    const q: any = {
      select: () => q,
      eq: (c: string, v: unknown) => { preds.push((r) => r[c] === v); return q; },
      neq: (c: string, v: unknown) => { preds.push((r) => r[c] !== v); return q; },
      in: (c: string, vs: unknown[]) => { preds.push((r) => vs.includes(r[c])); return q; },
      limit: () => q,
      insert: (p: Row) => { op = "insert"; payload = p; return q; },
      update: (p: Row) => { op = "update"; payload = p; return q; },
      single: () => Promise.resolve({ data: run().data[0] ?? null, error: null }),
      maybeSingle: () => Promise.resolve({ data: run().data[0] ?? null, error: null }),
      then: (ok: any, ko: any) => Promise.resolve(run()).then(ok, ko),
    };
    return q;
  },
});

// ─── Fake web: page -> HTML ─────────────────────────────────────────────────
let pages: Record<string, string> = {};
const fakeFetch = (async (url: string) => (url in pages ? new Response(pages[url]) : new Response("", { status: 404 }))) as any;
const lien = (to: string) => `<p>Partenaire : <a class="x" href="${to}">voir</a></p>`;

const NOW = new Date("2026-10-20T12:00:00Z");
const jours = (n: number) => new Date(NOW.getTime() - n * 86400000).toISOString();

function reset() {
  nextId = 1; pages = {};
  tables = {
    users: [{ id: "a", email: "a@t" }, { id: "b", email: "b@t" }, { id: "c", email: "c@t" }],
    forge_members: [
      { user_id: "a", url_site: "https://www.site-a.ca/", statut: "actif", tier_abonnement: "silver", badge_installe: true, niche: "SEO", updated_at: NOW.toISOString() },
      { user_id: "b", url_site: "https://site-b.com", statut: "actif", tier_abonnement: "gold", badge_installe: true, niche: "SEO", updated_at: NOW.toISOString() },
      { user_id: "c", url_site: "https://site-c.org", statut: "actif", tier_abonnement: "bronze", badge_installe: true, niche: "SEO", updated_at: NOW.toISOString() },
    ],
    forge_exchanges: [], forge_trust_scores: [],
  };
}

// ─── Link detection ─────────────────────────────────────────────────────────
test("link detection: an absolute <a href> to the partner domain, www or not; relative links and other domains do not count", () => {
  assert.equal(ex.contientLienVers(lien("https://www.site-b.com/blog/x"), "site-b.com"), true);
  assert.equal(ex.contientLienVers(lien("http://site-b.com"), "site-b.com"), true);
  assert.equal(ex.contientLienVers(lien("/site-b.com"), "site-b.com"), false);
  assert.equal(ex.contientLienVers(lien("https://site-b.com.evil.io/"), "site-b.com"), false);
  assert.equal(ex.contientLienVers("<p>https://site-b.com en texte</p>", "site-b.com"), false);
});

// ─── Propose / respond ──────────────────────────────────────────────────────
test("propose: Bronze refused, self refused, unknown partner 404, then created; a second one with the same pair is 409", async () => {
  reset();
  await assert.rejects(ex.proposerEchange("c", "a"), (e: any) => e.status === 403);
  await assert.rejects(ex.proposerEchange("a", "a"), (e: any) => e.status === 400);
  await assert.rejects(ex.proposerEchange("a", "zzz"), (e: any) => e.status === 404);
  const e = await ex.proposerEchange("a", "b", NOW);
  assert.equal(e.statut, "propose");
  await assert.rejects(ex.proposerEchange("b", "a"), (err: any) => err.status === 409, "the reverse pair is the same exchange");
});

test("respond: only the invited member, only once; accept -> accepte, decline -> refuse", async () => {
  reset();
  const e = await ex.proposerEchange("a", "b", NOW);
  await assert.rejects(ex.repondreEchange("a", e.id, true), (err: any) => err.status === 403);
  await assert.rejects(ex.repondreEchange("c", e.id, true), (err: any) => err.status === 404);
  assert.equal(await ex.repondreEchange("b", e.id, true, NOW), "accepte");
  await assert.rejects(ex.repondreEchange("b", e.id, false), (err: any) => err.status === 409);
  const e2 = await ex.proposerEchange("b", "c", NOW).catch(() => null);
  assert.equal(e2?.statut, "propose");
  assert.equal(await ex.repondreEchange("c", e2!.id, false, NOW), "refuse", "a Bronze member may still decline");
});

// ─── Declare links ──────────────────────────────────────────────────────────
test("declare: page must be on my own domain; link found -> my side verified (publie); both sides -> verifie", async () => {
  reset();
  const e = await ex.proposerEchange("a", "b", NOW);
  await ex.repondreEchange("b", e.id, true, NOW);
  await assert.rejects(ex.declarerLien("a", e.id, "https://site-b.com/x", { fetchImpl: fakeFetch }), (err: any) => err.status === 400);

  pages["https://site-a.ca/partenaires"] = lien("https://site-b.com/");
  let r = await ex.declarerLien("a", e.id, "https://site-a.ca/partenaires", { fetchImpl: fakeFetch, now: NOW });
  assert.deepEqual(r, { statut: "publie", lien_verifie: true, raison: undefined });

  pages["https://site-b.com/amis"] = "<p>pas encore de lien</p>";
  r = await ex.declarerLien("b", e.id, "https://site-b.com/amis", { fetchImpl: fakeFetch, now: NOW });
  assert.equal(r.statut, "publie");
  assert.equal(r.lien_verifie, false);
  assert.equal(r.raison, "Aucun lien vers site-a.ca sur la page");

  pages["https://site-b.com/amis"] = lien("https://www.site-a.ca/");
  r = await ex.declarerLien("b", e.id, "https://site-b.com/amis", { fetchImpl: fakeFetch, now: NOW });
  assert.equal(r.statut, "verifie");
  const row = tables.forge_exchanges[0];
  assert.equal(row.verifie_at, NOW.toISOString());
  assert.equal(row.raison, null);
});

test("declare: not possible before acceptance", async () => {
  reset();
  const e = await ex.proposerEchange("a", "b", NOW);
  await assert.rejects(ex.declarerLien("a", e.id, "https://site-a.ca/p", { fetchImpl: fakeFetch }), (err: any) => err.status === 409);
});

test("history: each member sees the exchange from their side", async () => {
  reset();
  const e = await ex.proposerEchange("a", "b", NOW);
  await ex.repondreEchange("b", e.id, true, NOW);
  pages["https://site-a.ca/p"] = lien("https://site-b.com/");
  await ex.declarerLien("a", e.id, "https://site-a.ca/p", { fetchImpl: fakeFetch, now: NOW });
  const [vueA] = await ex.listerMesEchanges("a");
  const [vueB] = await ex.listerMesEchanges("b");
  assert.equal(vueA.role, "propose_par_moi");
  assert.equal(vueA.partenaire.url_site, "https://site-b.com");
  assert.deepEqual(vueA.mon_lien, { url: "https://site-a.ca/p", verifie: true });
  assert.equal(vueB.role, "recu");
  assert.deepEqual(vueB.son_lien, { url: "https://site-a.ca/p", verifie: true });
  assert.deepEqual(vueB.mon_lien, { url: null, verifie: false });
});

// ─── Daily cron ─────────────────────────────────────────────────────────────
const echange = (champs: Row) => ({ id: `ex-${nextId++}`, membre_a: "a", membre_b: "b", verifie_a: false, verifie_b: false, url_a: null, url_b: null, propose_at: jours(1), accepte_at: null, grace_expire_at: null, raison: null, ...champs });

test("cron expiry: proposed > 14 days and accepted > 60 days without both links verified", async () => {
  reset();
  tables.forge_exchanges = [
    echange({ statut: "propose", propose_at: jours(15) }),
    echange({ statut: "propose", propose_at: jours(13) }),
    echange({ statut: "accepte", accepte_at: jours(61) }),
    echange({ statut: "publie", accepte_at: jours(59), url_a: "https://site-a.ca/p" }),
  ];
  const bilan = await ex.runExchangeCron({ fetchImpl: fakeFetch, now: NOW });
  assert.deepEqual(tables.forge_exchanges.map((e) => e.statut), ["expire", "propose", "expire", "publie"]);
  assert.equal(bilan.expires, 2);
});

test("cron verification: declared links found later -> verifie", async () => {
  reset();
  tables.forge_exchanges = [echange({ statut: "publie", accepte_at: jours(5), url_a: "https://site-a.ca/p", url_b: "https://site-b.com/q", verifie_a: true })];
  pages["https://site-b.com/q"] = lien("https://site-a.ca/");
  await ex.runExchangeCron({ fetchImpl: fakeFetch, now: NOW });
  assert.equal(tables.forge_exchanges[0].statut, "verifie");
  assert.equal(tables.forge_exchanges[0].verifie_b, true);
});

test("cron re-check: missing link opens a 7-day grace, back online clears it, still missing after the grace -> rompu", async () => {
  reset();
  tables.forge_exchanges = [echange({ statut: "verifie", url_a: "https://site-a.ca/p", url_b: "https://site-b.com/q", verifie_a: true, verifie_b: true })];
  pages["https://site-a.ca/p"] = lien("https://site-b.com/");
  // B removed its link
  let bilan = await ex.runExchangeCron({ fetchImpl: fakeFetch, now: NOW });
  const row = tables.forge_exchanges[0];
  assert.equal(row.statut, "verifie", "still verified during the grace");
  assert.equal(row.grace_expire_at, new Date(NOW.getTime() + 7 * 86400000).toISOString());
  assert.match(row.raison, /Page HTTP 404/);
  assert.equal(bilan.en_grace, 1);

  pages["https://site-b.com/q"] = lien("https://site-a.ca/");
  bilan = await ex.runExchangeCron({ fetchImpl: fakeFetch, now: new Date(NOW.getTime() + 2 * 86400000) });
  assert.equal(row.grace_expire_at, null);
  assert.equal(bilan.retablis, 1);

  delete pages["https://site-b.com/q"];
  await ex.runExchangeCron({ fetchImpl: fakeFetch, now: new Date(NOW.getTime() + 3 * 86400000) });
  await ex.runExchangeCron({ fetchImpl: fakeFetch, now: new Date(NOW.getTime() + 11 * 86400000) });
  assert.equal(row.statut, "rompu");
  assert.ok(row.termine_at);
});

// ─── Matchmaking ────────────────────────────────────────────────────────────
test("matchmaking: a partner with an exchange in progress or verified is not suggested again; a declined one is", async () => {
  reset();
  tables.forge_members.push({ user_id: "d", url_site: "https://site-d.net", statut: "actif", tier_abonnement: "gold", badge_installe: true, niche: "SEO", updated_at: NOW.toISOString() });
  tables.forge_exchanges = [echange({ statut: "verifie", membre_a: "b", membre_b: "a" }), echange({ statut: "refuse", membre_b: "c" })];
  const ids = (await getRecommendedPartners("a")).map((p: any) => p.user_id).sort();
  assert.deepEqual(ids, ["c", "d"]);
});

// ─── Routes ─────────────────────────────────────────────────────────────────
const forgeRoutes = require("../dist/routes/forge/forge.routes.js").default;
async function call(method: string, path: string, body: unknown, userId?: string) {
  const app = express();
  app.use(cookieParser()); app.use(express.json()); app.use("/api/forge", forgeRoutes);
  const server = app.listen(0);
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (userId) headers.Cookie = `forge_session=${createSession(userId)}`;
    const res = await fetch(`http://127.0.0.1:${(server.address() as AddressInfo).port}${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
    return { status: res.status, body: await res.json() };
  } finally { server.close(); }
}

test("routes: login required; propose 201, accept, list; errors keep their status", async () => {
  reset();
  assert.equal((await call("GET", "/api/forge/exchanges", undefined)).status, 401);
  const p = await call("POST", "/api/forge/exchanges", { partenaire_id: "b" }, "a");
  assert.equal(p.status, 201);
  assert.equal(p.body.echange.statut, "propose");
  assert.equal((await call("POST", "/api/forge/exchanges", { partenaire_id: "b" }, "a")).status, 409);
  assert.equal((await call("POST", `/api/forge/exchanges/${p.body.echange.id}/accepter`, {}, "a")).status, 403);
  const acc = await call("POST", `/api/forge/exchanges/${p.body.echange.id}/accepter`, {}, "b");
  assert.deepEqual(acc.body, { ok: true, statut: "accepte" });
  const liste = await call("GET", "/api/forge/exchanges", undefined, "b");
  assert.equal(liste.body.echanges.length, 1);
  assert.equal(liste.body.echanges[0].statut, "accepte");
});
