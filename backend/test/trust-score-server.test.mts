// Server-side Trust Score: orchestration (cache, pending state, admin entries), admin and recalculate routes.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import type { AddressInfo } from "node:net";

process.env.FORGE_JWT_SECRET = "test-secret";
process.env.ANTHROPIC_API_KEY ??= "test";
process.env.FORGE_ADMIN_EMAILS = " Admin@Noxel.test , autre@noxel.test";

const require = createRequire(import.meta.url);
const express = require("express");
const cookieParser = require("cookie-parser");
const supabaseClient = require("../dist/lib/supabaseClient.js");
const serveur = require("../dist/services/forge/trustScoreServeur.js");
const { getTrustScore } = require("../dist/services/forge/trustScore.service.js");
const { estAdmin } = require("../dist/middleware/requireAdmin.js");
const { createSession } = require("../dist/services/session.js");

// ─── Fake Supabase: in-memory tables; upsert/update really change the rows ───
type Row = Record<string, any>;
let tables: Record<string, Row[]> = {};
let writes: { table: string; op: string; row: Row }[] = [];

function fakeSupabase() {
  return {
    from(table: string) {
      const filters: [string, unknown][] = [];
      const inFilters: [string, unknown[]][] = [];
      let op = "select";
      let payload: Row | null = null;
      const match = (r: Row) => filters.every(([c, v]) => r[c] === v) && inFilters.every(([c, vs]) => vs.includes(r[c]));
      const run = () => {
        const rows = (tables[table] ??= []);
        if (op === "upsert") {
          writes.push({ table, op, row: payload! });
          const i = rows.findIndex((r) => r.user_id === payload!.user_id);
          if (i >= 0) rows[i] = { ...rows[i], ...payload }; else rows.push({ ...payload });
          return { data: null, error: null };
        }
        if (op === "update") {
          writes.push({ table, op, row: payload! });
          rows.filter(match).forEach((r) => Object.assign(r, payload));
          return { data: null, error: null };
        }
        return { data: rows.filter(match), error: null };
      };
      const one = () => { const r: any = run(); return { data: Array.isArray(r.data) ? r.data[0] ?? null : r.data, error: null }; };
      const q: any = {
        select: () => q,
        eq: (c: string, v: unknown) => { filters.push([c, v]); return q; },
        in: (c: string, vs: unknown[]) => { inFilters.push([c, vs]); return q; },
        limit: () => q,
        upsert: (row: Row) => { op = "upsert"; payload = row; return q; },
        update: (row: Row) => { op = "update"; payload = row; return q; },
        single: () => Promise.resolve(one()),
        maybeSingle: () => Promise.resolve(one()),
        then: (ok: any, ko: any) => Promise.resolve(run()).then(ok, ko),
      };
      return q;
    },
  };
}
supabaseClient.getSupabase = fakeSupabase;

const NOW = new Date("2026-10-20T12:00:00Z");
const daysAgo = (n: number) => new Date(NOW.getTime() - n * 86400000).toISOString();

// Fake network: RDAP 10 years, sitemap with 3 recent dates, a home page with enough text
let fetchCalls: string[] = [];
const fetchOk = (async (url: string) => {
  fetchCalls.push(String(url));
  if (url === "https://rdap.org/domain/exemple.ca") return new Response(JSON.stringify({ events: [{ eventAction: "registration", eventDate: "2016-10-20T12:00:00Z" }] }));
  if (url === "https://exemple.ca/sitemap.xml") return new Response(`<urlset>${[2, 5, 9].map((d) => `<url><lastmod>${daysAgo(d)}</lastmod></url>`).join("")}</urlset>`);
  if (url === "https://exemple.ca/") return new Response(`<p>${"Contenu original et utile. ".repeat(20)}</p>`);
  return new Response("", { status: 404 });
}) as any;
const deps = (extra: Record<string, unknown> = {}) => ({ fetchImpl: fetchOk, evaluerContenu: async () => 80, now: () => NOW, ...extra });

function reset(extra: Record<string, Row[]> = {}) {
  tables = {
    users: [{ id: "u-admin", email: "admin@noxel.test" }, { id: "u-membre", email: "membre@test" }],
    forge_members: [{ user_id: "u-membre", url_site: "https://www.exemple.ca/" }],
    forge_trust_scores: [],
    ...extra,
  };
  writes = [];
  fetchCalls = [];
}
const stored = () => tables.forge_trust_scores.find((r) => r.user_id === "u-membre");

// ─── Orchestration ──────────────────────────────────────────────────────────
test("first computation: auto signals collected with source and date, score pending without admin entry", async () => {
  reset();
  const r = await serveur.recalculerTrustScoreServeur("u-membre", deps());
  assert.equal(r.statut, "en_attente");
  assert.equal(r.score, null);
  assert.equal(r.tier, null);
  assert.deepEqual(r.sources.technique, { valeur: null, source: "nse", collecte_at: NOW.toISOString(), raison: "Source NOXEL SEO pas encore branchée" });
  assert.equal(r.sources.anciennete.source, "rdap");
  assert.equal(r.sources.frequence.source, "sitemap");
  assert.deepEqual(r.sources.contenu, { valeur: 80, source: "alfred", collecte_at: NOW.toISOString() });
  assert.equal(r.sources.autorite, undefined);
  const row = stored();
  assert.equal(row.statut, "en_attente");
  assert.equal(row.score, null);
  assert.equal(row.signal_autorite, null);
  assert.equal(row.signal_spam, null);
  assert.equal(row.signal_technique, 0);
  assert.deepEqual(row.signaux_sources, r.sources);
});

test("cache: a value under 30 days is reused, an older or failed one is collected again", async () => {
  const fresh = { valeur: 3, source: "rdap", collecte_at: daysAgo(29) };
  const old = { valeur: 1, source: "sitemap", collecte_at: daysAgo(31) };
  const failed = { valeur: null, source: "alfred", collecte_at: daysAgo(1), raison: "Alfred indisponible" };
  reset({ forge_trust_scores: [{ user_id: "u-membre", signaux_sources: { anciennete: fresh, frequence: old, contenu: failed } }] });
  let alfredCalls = 0;
  const r = await serveur.recalculerTrustScoreServeur("u-membre", deps({ evaluerContenu: async () => { alfredCalls++; return 55; } }));
  assert.deepEqual(r.sources.anciennete, fresh);
  assert.ok(!fetchCalls.some((u) => u.startsWith("https://rdap.org/")), "RDAP not called again");
  assert.equal(r.sources.frequence.collecte_at, NOW.toISOString());
  assert.equal(r.sources.contenu.valeur, 55);
  assert.equal(alfredCalls, 1);
});

test("admin entry of authority and spam: score computed, Silver from 40", async () => {
  reset();
  const r = await serveur.enregistrerSaisieAdmin("u-membre", { domainAuthority: 20, spamScore: 30 }, "Admin@Noxel.test", deps());
  assert.equal(r.statut, "calcule");
  // technique 0 (NSE not wired) + autorite 10 + spam 14 + contenu 12 + anciennete 10 + frequence 2 = 48
  assert.deepEqual(r.points, { technique: 0, autorite: 10, spam: 14, contenu: 12, anciennete: 10, frequence: 2 });
  assert.equal(r.score, 48);
  assert.equal(r.tier, "silver");
  assert.deepEqual(r.sources.autorite, { valeur: 20, source: "admin", collecte_at: NOW.toISOString(), saisi_par: "admin@noxel.test" });
  assert.equal(stored().statut, "calcule");
  assert.equal(stored().score, 48);
});

test("only one admin value entered: still pending", async () => {
  reset();
  const r = await serveur.enregistrerSaisieAdmin("u-membre", { domainAuthority: 50 }, "admin@noxel.test", deps());
  assert.equal(r.statut, "en_attente");
  assert.equal(r.points.autorite, 22); // DA 50 -> 86.7 % of 25
  assert.equal(r.points.spam, null);
});

test("authority/spam values not entered by an admin are ignored", async () => {
  reset({ forge_trust_scores: [{ user_id: "u-membre", signaux_sources: {
    autorite: { valeur: 100, source: "rdap", collecte_at: daysAgo(1) },
    spam: { valeur: 0, source: "alfred", collecte_at: daysAgo(1) },
  } }] });
  const r = await serveur.recalculerTrustScoreServeur("u-membre", deps());
  assert.equal(r.statut, "en_attente");
  assert.equal(r.sources.autorite, undefined);
  assert.equal(r.sources.spam, undefined);
});

test("admin entry outside [0, 100] or missing is refused, nothing written", async () => {
  for (const bad of [{ domainAuthority: 101 }, { spamScore: -1 }, { domainAuthority: "50" }, {}]) {
    reset();
    await assert.rejects(serveur.enregistrerSaisieAdmin("u-membre", bad, "admin@noxel.test", deps()), serveur.ErreurSaisieAdmin);
    assert.deepEqual(writes, []);
  }
});

test("invalid site URL: each auto signal counts 0 with a reason, no fetch", async () => {
  reset({ forge_members: [{ user_id: "u-membre", url_site: "pas une url" }] });
  const r = await serveur.recalculerTrustScoreServeur("u-membre", deps());
  for (const n of ["anciennete", "frequence", "contenu"]) assert.equal(r.sources[n].raison, "URL du site invalide ou absente", n);
  assert.deepEqual(fetchCalls, []);
});

test("unknown member: null, nothing written", async () => {
  reset({ forge_members: [] });
  assert.equal(await serveur.recalculerTrustScoreServeur("u-membre", deps()), null);
  assert.deepEqual(writes, []);
});

test("getTrustScore: a pending score is treated as no score", async () => {
  reset({ forge_trust_scores: [{ user_id: "u-membre", statut: "en_attente", score: null, tier_forge: null }] });
  assert.equal(await getTrustScore("u-membre"), null);
});

// ─── Admin list ─────────────────────────────────────────────────────────────
test("FORGE_ADMIN_EMAILS: trimmed, case-insensitive, nothing else is admin", () => {
  assert.equal(estAdmin("admin@noxel.test"), true);
  assert.equal(estAdmin("AUTRE@noxel.test "), true);
  assert.equal(estAdmin("membre@test"), false);
  assert.equal(estAdmin(undefined), false);
  assert.equal(estAdmin("admin@noxel.test", { FORGE_ADMIN_EMAILS: "" }), false);
});

// ─── Routes ─────────────────────────────────────────────────────────────────
let recalcArgs: any[][] = [];
const origRecalc = serveur.recalculerTrustScoreServeur;
const forgeRoutes = require("../dist/routes/forge/forge.routes.js").default;

async function call(method: string, path: string, body: unknown, userId?: string) {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  app.use("/api/forge", forgeRoutes);
  const server = app.listen(0);
  try {
    const port = (server.address() as AddressInfo).port;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (userId) headers.Cookie = `forge_session=${createSession(userId)}`;
    const res = await fetch(`http://127.0.0.1:${port}${path}`, { method, headers, body: JSON.stringify(body) });
    return { status: res.status, body: await res.json() };
  } finally {
    server.close();
  }
}

test("recalculate route: login required, the body is never passed on", async () => {
  reset();
  serveur.recalculerTrustScoreServeur = async (...args: any[]) => { recalcArgs.push(args); return { statut: "en_attente", score: null }; };
  try {
    const anon = await call("POST", "/api/forge/trust-score/recalculate", {});
    assert.equal(anon.status, 401);
    const r = await call("POST", "/api/forge/trust-score/recalculate",
      { scoresTechnique: 100, domainAuthority: 100, spamScore: 0, qualiteContenu: 100 }, "u-membre");
    assert.equal(r.status, 200);
    assert.deepEqual(recalcArgs, [["u-membre"]]);
  } finally {
    serveur.recalculerTrustScoreServeur = origRecalc;
  }
});

test("admin route: 401 anonymous, 403 for a member, 400 out of range, 404 unknown member", async () => {
  reset();
  assert.equal((await call("POST", "/api/forge/admin/trust-score/u-membre", { domainAuthority: 50, spamScore: 10 })).status, 401);
  const membre = await call("POST", "/api/forge/admin/trust-score/u-membre", { domainAuthority: 50, spamScore: 10 }, "u-membre");
  assert.equal(membre.status, 403);
  assert.deepEqual(writes, []);
  assert.equal((await call("POST", "/api/forge/admin/trust-score/u-membre", { domainAuthority: 500 }, "u-admin")).status, 400);
  assert.equal((await call("POST", "/api/forge/admin/trust-score/inconnu", { domainAuthority: 50 }, "u-admin")).status, 404);
});

test("recalculate route: at most one member recomputation every 10 minutes (429), nothing collected", async () => {
  reset({ forge_trust_scores: [{ user_id: "u-membre", calcule_at: new Date(Date.now() - 4 * 60_000).toISOString() }] });
  recalcArgs = [];
  serveur.recalculerTrustScoreServeur = async (...args: any[]) => { recalcArgs.push(args); return { statut: "en_attente", score: null }; };
  try {
    const r = await call("POST", "/api/forge/trust-score/recalculate", {}, "u-membre");
    assert.equal(r.status, 429);
    assert.match(r.body.error, /Réessaie dans 6 min/);
    assert.deepEqual(recalcArgs, []);
  } finally {
    serveur.recalculerTrustScoreServeur = origRecalc;
  }
});

test("admin list: 403 for a member; for an admin, every member with e-mail, pending scores first", async () => {
  reset({
    forge_members: [
      { user_id: "u-membre", url_site: "https://www.exemple.ca/", statut: "actif", tier_abonnement: "silver" },
      { user_id: "u-ok", url_site: "https://ok.ca", statut: "actif", tier_abonnement: "gold" },
      { user_id: "u-new", url_site: "https://new.ca", statut: "actif", tier_abonnement: "bronze" },
    ],
    forge_trust_scores: [
      { user_id: "u-ok", statut: "calcule", score: 61, tier_forge: "gold", calcule_at: daysAgo(1), signaux_sources: { autorite: { valeur: 40, source: "admin", collecte_at: daysAgo(1), saisi_par: "admin@noxel.test" } } },
      { user_id: "u-membre", statut: "en_attente", score: null, tier_forge: null, calcule_at: daysAgo(2), signaux_sources: {} },
    ],
  });
  assert.equal((await call("GET", "/api/forge/admin/trust-scores", undefined, "u-membre")).status, 403);
  const r = await call("GET", "/api/forge/admin/trust-scores", undefined, "u-admin");
  assert.equal(r.status, 200);
  assert.deepEqual(r.body.membres.map((m: any) => [m.user_id, m.statut_score]), [["u-membre", "en_attente"], ["u-new", null], ["u-ok", "calcule"]]);
  assert.equal(r.body.membres[0].email, "membre@test");
  assert.equal(r.body.membres[2].sources.autorite.saisi_par, "admin@noxel.test");
});

test("admin recalculate: no 10-minute cooldown, member-only route still has it", async () => {
  reset({ forge_trust_scores: [{ user_id: "u-membre", calcule_at: new Date().toISOString() }] });
  recalcArgs = [];
  serveur.recalculerTrustScoreServeur = async (...args: any[]) => { recalcArgs.push(args); return { statut: "en_attente", score: null }; };
  try {
    assert.equal((await call("POST", "/api/forge/admin/trust-score/u-membre/recalculate", {}, "u-membre")).status, 403);
    const r = await call("POST", "/api/forge/admin/trust-score/u-membre/recalculate", {}, "u-admin");
    assert.equal(r.status, 200);
    assert.deepEqual(recalcArgs, [["u-membre"]]);
  } finally {
    serveur.recalculerTrustScoreServeur = origRecalc;
  }
});
