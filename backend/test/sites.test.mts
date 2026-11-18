// Several sites per account: limit per plan, proven domains, submissions on any proven site
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

process.env.FORGE_JWT_SECRET ??= "test-secret";
process.env.ANTHROPIC_API_KEY ??= "test";
const require = createRequire(import.meta.url);
const supabaseClient = require("../dist/lib/supabaseClient.js");
const sites = require("../dist/services/forge/sites.service.js");

type Row = Record<string, any>;
let tables: Record<string, Row[]> = {};
function fakeSupabase() {
  return {
    from(table: string) {
      const preds: ((r: Row) => boolean)[] = [];
      let action: "select" | "insert" | "update" | "delete" = "select";
      let payload: Row = {};
      const rows = () => (tables[table] ?? []).filter((r) => preds.every((p) => p(r)));
      const run = () => {
        if (action === "insert") { (tables[table] ??= []).push({ ...payload }); return { data: null, error: null }; }
        if (action === "update") { rows().forEach((r) => Object.assign(r, payload)); return { data: null, error: null }; }
        if (action === "delete") { const keep = (tables[table] ?? []).filter((r) => !preds.every((p) => p(r))); tables[table] = keep; return { data: null, error: null }; }
        return { data: rows(), error: null };
      };
      const q: any = {
        select: () => q, order: () => q,
        eq: (c: string, v: unknown) => { preds.push((r) => r[c] === v); return q; },
        not: (c: string) => { preds.push((r) => r[c] != null); return q; },
        insert: (p: Row) => { action = "insert"; payload = p; return q; },
        update: (p: Row) => { action = "update"; payload = p; return q; },
        delete: () => { action = "delete"; return q; },
        maybeSingle: () => Promise.resolve({ data: rows()[0] ?? null, error: null }),
        then: (ok: any, ko: any) => Promise.resolve(run()).then(ok, ko),
      };
      return q;
    },
  };
}
supabaseClient.getSupabase = fakeSupabase;

const membre = (tier: string) => ({ user_id: "u1", tier_abonnement: tier, url_site: "https://premier.ca", domaine: "premier.ca", niche: "SEO", domaine_verifie_at: "2026-11-18T00:00:00Z" });

test("limit per plan: Bronze 1, Silver 1, Gold 3, Platinum 10, Diamond 25", () => {
  assert.deepEqual(["bronze", "silver", "gold", "platinum", "diamond"].map(sites.limiteSites), [1, 1, 3, 10, 25]);
  assert.equal(sites.limiteSites(undefined), 1);
});

test("Silver cannot add a second site, Gold can add up to 3 in all", async () => {
  tables = { forge_members: [membre("silver")], forge_sites: [] };
  const refus = await sites.ajouterSite("u1", "https://deux.ca", "SEO");
  assert.equal(refus.ok, false); assert.equal(refus.status, 403);

  tables = { forge_members: [membre("gold")], forge_sites: [] };
  assert.equal((await sites.ajouterSite("u1", "deux.ca", "SEO")).ok, true);
  assert.equal((await sites.ajouterSite("u1", "https://trois.ca/", null)).ok, true);
  const quatrieme = await sites.ajouterSite("u1", "quatre.ca", null);
  assert.equal(quatrieme.ok, false); assert.equal(quatrieme.status, 403);
});

test("a domain proven by another account is refused, the same domain twice too", async () => {
  tables = { forge_members: [membre("diamond"), { user_id: "u2", domaine: "pris.ca", domaine_verifie_at: "2026-11-01" }], forge_sites: [] };
  const pris = await sites.ajouterSite("u1", "pris.ca", null);
  assert.equal(pris.ok, false); assert.equal(pris.status, 409);
  const double = await sites.ajouterSite("u1", "www.premier.ca", null);
  assert.equal(double.ok, false); assert.equal(double.status, 409);
});

test("only proven sites count for submissions; proof by meta tag marks the site proven", async () => {
  tables = { forge_members: [membre("diamond")], forge_sites: [] };
  await sites.ajouterSite("u1", "app.exemple.ca", null);
  assert.deepEqual(await sites.domainesProuves("u1"), ["premier.ca"]);
  const jeton = require("../dist/services/forge/domainOwnership.js").jetonDomaine("u1", "app.exemple.ca");
  const r = await sites.verifierSite("u1", "app.exemple.ca", {
    fetchImpl: (async () => new Response(`<meta name="noxel-forge-verification" content="${jeton}">`, { status: 200, headers: { "content-type": "text/html" } })) as any,
    resolveTxt: async () => { throw new Error("none"); },
  });
  assert.equal(r.ok && r.verifie, true);
  assert.deepEqual((await sites.domainesProuves("u1")).sort(), ["app.exemple.ca", "premier.ca"]);
  await sites.retirerSite("u1", "app.exemple.ca");
  assert.deepEqual(await sites.domainesProuves("u1"), ["premier.ca"]);
});

test("before the migration (no forge_sites table) the first site still works", async () => {
  const orig = supabaseClient.getSupabase;
  supabaseClient.getSupabase = () => {
    const base = fakeSupabase();
    return { from(t: string) {
      if (t !== "forge_sites") return base.from(t);
      const q: any = { select: () => q, eq: () => q, not: () => q,
        then: (ok: any, ko: any) => Promise.resolve({ data: null, error: { code: "42P01", message: 'relation "forge_sites" does not exist' } }).then(ok, ko) };
      return q;
    } };
  };
  try {
    tables = { forge_members: [membre("silver")] };
    assert.deepEqual(await sites.domainesProuves("u1"), ["premier.ca"]);
    assert.equal(await sites.domaineProuveParAutre("autre.ca", "u1"), false);
  } finally { supabaseClient.getSupabase = orig; }
});
