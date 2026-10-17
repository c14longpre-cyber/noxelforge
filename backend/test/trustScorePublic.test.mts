// Public Trust Score response (GET /api/trust-score/:domain) — run with: npm test (from backend/)
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  normaliserDomaine, signalLePlusFaible, construireReponseTrouvee, reponseNonTrouvee, SIGNAL_MAX,
  chercherTrustScorePublic, ErreurSupabase, scoreServeurActif,
} from "../src/services/forge/trustScorePublic.ts";

test("normaliserDomaine: lowercase, no protocol, no www., no path/port/query", () => {
  assert.equal(normaliserDomaine("exemple.ca"), "exemple.ca");
  assert.equal(normaliserDomaine("HTTPS://WWW.Exemple.CA/page?x=1#a"), "exemple.ca");
  assert.equal(normaliserDomaine("http://www.exemple.ca:8080/"), "exemple.ca");
  assert.equal(normaliserDomaine("  sous.exemple.ca.  "), "sous.exemple.ca");
});

test("normaliserDomaine: rejects what is not a domain name", () => {
  for (const bad of ["", "localhost", "exemple", "%25.ca", "exemple_.ca", "a b.ca", null, 42])
    assert.equal(normaliserDomaine(bad as any), null, String(bad));
});

const row = {
  score: 71, signal_technique: 19, signal_autorite: 15, signal_spam: 18,
  signal_contenu: 11, signal_anciennete: 6, signal_frequence: 2,
  calcule_at: "2026-10-01T12:00:00+00:00",
  // must never leak
  user_id: "u-123", tier_forge: "gold", details: { inputs: { userId: "u-123" } }, email: "x@y.z",
};

test("found response follows the MCP contract exactly", () => {
  assert.deepEqual(construireReponseTrouvee("exemple.ca", row), {
    ok: true, found: true, domain: "exemple.ca",
    trust_score: 71,
    signals: { technical: 19, authority: 15, spam: 18, content: 11, age: 6, frequency: 2 },
    max: { technical: 25, authority: 25, spam: 20, content: 15, age: 10, frequency: 5 },
    weakest: "frequency",
    computedAt: "2026-10-01T12:00:00.000Z",
  });
});

test("no personal data or tier in the response", () => {
  const json = JSON.stringify(construireReponseTrouvee("exemple.ca", row));
  for (const leak of ["u-123", "gold", "x@y.z", "user_id", "tier", "details", "email"])
    assert.ok(!json.includes(leak), leak);
});

test("weakest = lowest score/max ratio", () => {
  // authority 5/25 = 0.2 is below frequency 2/5 = 0.4
  assert.equal(signalLePlusFaible({ technical: 20, authority: 5, spam: 18, content: 12, age: 8, frequency: 2 }), "authority");
});

test("a signal that is not stored is null, never invented, and is ignored by weakest", () => {
  const r = construireReponseTrouvee("exemple.ca", { score: 50, signal_technique: 20, signal_autorite: null, calcule_at: null });
  assert.deepEqual(r.signals, { technical: 20, authority: null, spam: null, content: null, age: null, frequency: null });
  assert.equal(r.weakest, "technical");
  assert.equal(r.computedAt, null);
  assert.equal(signalLePlusFaible({ technical: null, authority: null, spam: null, content: null, age: null, frequency: null }), null);
});

test("not found response", () => {
  assert.deepEqual(reponseNonTrouvee("exemple.ca"), { ok: true, found: false, domain: "exemple.ca" });
  assert.equal(Object.values(SIGNAL_MAX).reduce((a, b) => a + b, 0), 100);
});

// In-memory stand-in for the Supabase query builder (eq, ilike, in, order, limit)
function fakeDb(tables: Record<string, any[]>, failOn?: string) {
  return {
    from(table: string) {
      return {
        select(_cols: string) {
          let rows = [...(tables[table] ?? [])];
          let error: any = failOn === table ? { message: "boom" } : null;
          const q: any = {
            eq: (c: string, v: unknown) => { rows = rows.filter((r) => r[c] === v); return q; },
            ilike: (c: string, p: string) => {
              const needle = p.replace(/%/g, "").toLowerCase();
              rows = rows.filter((r) => String(r[c] ?? "").toLowerCase().includes(needle)); return q;
            },
            in: (c: string, vs: unknown[]) => { rows = rows.filter((r) => vs.includes(r[c])); return q; },
            order: (c: string, o?: any) => {
              rows.sort((a, b) => String(a[c] ?? "").localeCompare(String(b[c] ?? "")) * (o?.ascending === false ? -1 : 1)); return q;
            },
            limit: (n: number) => { rows = rows.slice(0, n); return q; },
            then: (ok: any, ko: any) => Promise.resolve({ data: error ? null : rows, error }).then(ok, ko),
          };
          return q;
        },
      };
    },
  };
}

const score = (user_id: string, s: number) => ({
  user_id, score: s, tier_forge: "gold", signal_technique: 19, signal_autorite: 15, signal_spam: 18,
  signal_contenu: 11, signal_anciennete: 6, signal_frequence: 2, calcule_at: "2026-10-01T12:00:00Z",
});
const db = fakeDb({
  forge_members: [
    { user_id: "pub", url_site: "https://www.public.ca/", statut: "actif" },
    { user_id: "grace", url_site: "http://grace.ca", statut: "actif" },
    { user_id: "susp", url_site: "suspendu.ca", statut: "suspendu" },
    { user_id: "other", url_site: "https://notpublic.ca", statut: "actif" },
  ],
  forge_badges: [
    { user_id: "pub", statut: "verifie" },
    { user_id: "grace", statut: "grace" },
    { user_id: "susp", statut: "verifie" },
  ],
  forge_trust_scores: [score("pub", 71), score("grace", 64), score("susp", 55), score("other", 40)],
});

const COMPUTED = { serverComputed: true }; // once the server computes the score

test("member with a public (verified) badge: found with the stored score (server computation on)", async () => {
  const r: any = await chercherTrustScorePublic(db, "public.ca", COMPUTED);
  assert.equal(r.found, true);
  assert.equal(r.trust_score, 71);
});

test("member without a public badge, suspended member, unknown domain: found:false, no score", async () => {
  for (const d of ["grace.ca", "suspendu.ca", "notpublic.ca", "inconnu.ca"])
    for (const opts of [{}, COMPUTED])
      assert.deepEqual(await chercherTrustScorePublic(db, d, opts), { ok: true, found: false, domain: d }, d);
});

test("ilike narrowing does not match a different domain containing the same text", async () => {
  // "public.ca" is a substring of "notpublic.ca": only the exact normalized domain counts
  const r: any = await chercherTrustScorePublic(db, "public.ca", COMPUTED);
  assert.equal(r.trust_score, 71);
});

test("a Supabase { error } is raised, never treated as 'not found'", async () => {
  for (const table of ["forge_members", "forge_badges", "forge_trust_scores"])
    await assert.rejects(chercherTrustScorePublic(fakeDb({
      forge_members: [{ user_id: "pub", url_site: "public.ca", statut: "actif" }],
      forge_badges: [{ user_id: "pub", statut: "verifie" }],
      forge_trust_scores: [score("pub", 71)],
    }, table), "public.ca", COMPUTED), ErreurSupabase, table);
});

// No server computation yet: a public member is "pending", never a figure
test("default (flag off): a public member gets status pending, no score, no signals", async () => {
  assert.deepEqual(await chercherTrustScorePublic(db, "public.ca"), {
    ok: true, found: true, domain: "public.ca", status: "pending",
    trust_score: null, signals: null,
    max: { technical: 25, authority: 25, spam: 20, content: 15, age: 10, frequency: 5 },
    weakest: null, computedAt: null,
    message: "Trust Score en cours de calcul par NOXEL.",
  });
});

test("default (flag off): forge_trust_scores is not even read", async () => {
  // A failure on forge_trust_scores would throw if it were queried
  const r: any = await chercherTrustScorePublic(fakeDb({
    forge_members: [{ user_id: "pub", url_site: "public.ca", statut: "actif" }],
    forge_badges: [{ user_id: "pub", statut: "verifie" }],
  }, "forge_trust_scores"), "public.ca");
  assert.equal(r.status, "pending");
});

test("TRUST_SCORE_SERVER_COMPUTED: off unless exactly 'true'", () => {
  assert.equal(scoreServeurActif({}), false);
  assert.equal(scoreServeurActif({ TRUST_SCORE_SERVER_COMPUTED: "false" }), false);
  assert.equal(scoreServeurActif({ TRUST_SCORE_SERVER_COMPUTED: "1" }), false);
  assert.equal(scoreServeurActif({ TRUST_SCORE_SERVER_COMPUTED: "true" }), true);
});
