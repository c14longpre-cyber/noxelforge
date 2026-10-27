// Audit fixes: Trust Score bounds, submissions use the paid tier, a suspended member whose badge
// is back gets reactivated by the badge check. Runs against the compiled code (npm test builds first).
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

process.env.FORGE_JWT_SECRET = "test-secret";
process.env.ANTHROPIC_API_KEY ??= "test";

const require = createRequire(import.meta.url);
const supabaseClient = require("../dist/lib/supabaseClient.js");
const { calculerTrustScore } = require("../dist/services/forge/trustScore.service.js");
const { traiterVerificationBadge, badgeDeps } = require("../dist/services/forge/badgeChecker.service.js");
const spamGate = require("../dist/services/forge/spamGate.service.js");
const alfred = require("../dist/services/forge/alfred.forge.service.js");
const trustScore = require("../dist/services/forge/trustScore.service.js");
const { creerSoumission } = require("../dist/controllers/forge/submissions.controller.js");

// ─── Fake Supabase: in-memory rows per table, every write recorded ──────────
type Row = Record<string, any>;
let tables: Record<string, Row[]> = {};
let writes: { table: string; op: string; row: Row; filters: [string, unknown][] }[] = [];

function fakeSupabase() {
  return {
    from(table: string) {
      const filters: [string, unknown][] = [];
      let op = "select";
      let payload: Row | null = null;
      const run = () => {
        if (op !== "select") {
          writes.push({ table, op, row: payload!, filters: [...filters] });
          return { data: { id: "new", ...payload }, error: null };
        }
        const rows = (tables[table] ?? []).filter((r) => filters.every(([c, v]) => r[c] === v));
        return { data: rows, error: null };
      };
      const one = () => {
        const r: any = run();
        return { data: Array.isArray(r.data) ? r.data[0] ?? null : r.data, error: r.error };
      };
      const q: any = {
        select: () => q,
        eq: (c: string, v: unknown) => { filters.push([c, v]); return q; },
        insert: (row: Row) => { op = "insert"; payload = row; return q; },
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

function reset(t: Record<string, Row[]>) { tables = t; writes = []; }

// ─── Trust Score bounds ─────────────────────────────────────────────────────
test("Trust Score: negative inputs never give a negative score or an oversized signal", () => {
  const r = calculerTrustScore({ userId: "u", urlSite: "https://a.com", scoresTechnique: -80, domainAuthority: -10, spamScore: -50, qualiteContenu: -5, ageDomaineAnnees: -3, publicationsParMois: -2 });
  assert.ok(r.score >= 0 && r.score <= 100, `score ${r.score}`);
  assert.ok(r.signaux.spam <= 20, `spam signal ${r.signaux.spam}`);
  for (const v of Object.values(r.signaux) as number[]) assert.ok(v >= 0, `signal ${v}`);
  assert.equal(r.tier, "bronze");
});

test("Trust Score: oversized or non-numeric inputs stay in [0, 100]", () => {
  const max = calculerTrustScore({ userId: "u", urlSite: "x", scoresTechnique: 999, domainAuthority: 999, spamScore: 0, qualiteContenu: 999, ageDomaineAnnees: 99, publicationsParMois: 99 });
  assert.equal(max.score, 100);
  assert.equal(max.tier, "diamond");
  const nan = calculerTrustScore({ userId: "u", urlSite: "x", scoresTechnique: NaN, domainAuthority: "abc" as any, spamScore: undefined, qualiteContenu: Infinity });
  assert.ok(Number.isFinite(nan.score) && nan.score >= 0 && nan.score <= 100, `score ${nan.score}`);
});

test("Trust Score: weights unchanged for normal inputs (25/25/20/15/10/5)", () => {
  const r = calculerTrustScore({ userId: "u", urlSite: "x", scoresTechnique: 100, domainAuthority: 60, spamScore: 0, qualiteContenu: 100, ageDomaineAnnees: 5, publicationsParMois: 4 });
  assert.deepEqual(r.signaux, { technique: 25, autorite: 25, spam: 20, contenu: 15, anciennete: 10, frequence: 5 });
});

// ─── Submissions use the paid tier, not the Trust Score tier ─────────────────
test("submission: a Silver member without a Trust Score is processed as Silver, not Bronze", async () => {
  reset({ forge_members: [{ user_id: "u1", tier_abonnement: "silver", scan_complete: true, badge_installe: true, date_inscription: new Date().toISOString() }] });
  const origSpam = spamGate.runSpamGate, origAlfred = alfred.traiterSoumission, origTs = trustScore.getTrustScore;
  let alfredInput: any = null;
  spamGate.runSpamGate = async () => ({ passe: true });
  trustScore.getTrustScore = async () => null;
  alfred.traiterSoumission = async (_id: string, input: any) => { alfredInput = input; };
  try {
    let status = 0;
    const res: any = { status(c: number) { status = c; return res; }, json() { return res; } };
    await creerSoumission({ userId: "u1", body: { url_soumise: "https://a.com/post", titre: "T" } } as any, res);
    assert.equal(status, 201);
    assert.equal(alfredInput?.tierForge, "silver");
  } finally {
    spamGate.runSpamGate = origSpam; alfred.traiterSoumission = origAlfred; trustScore.getTrustScore = origTs;
  }
});

// ─── Badge check reactivates a suspended member ─────────────────────────────
test("badge check: a suspended member whose badge is back becomes active again", async () => {
  reset({ forge_badges: [{ user_id: "u2", statut: "suspendu", tentatives_echec: 3 }] });
  const origFetch = badgeDeps.fetch;
  badgeDeps.fetch = (async () => new Response('<a href="https://noxelseo.com">NOXEL</a>', { status: 200 })) as any;
  try {
    const r = await traiterVerificationBadge("u2", "https://site.com");
    assert.equal(r.statut, "verifie");
    const memberWrites = writes.filter((w) => w.table === "forge_members");
    assert.ok(memberWrites.some((w) => w.row.statut === "actif"), "forge_members.statut set to actif");
    assert.ok(writes.some((w) => w.table === "forge_submissions" && w.row.backlink_noxel_actif === true), "approved backlinks re-enabled");
  } finally {
    badgeDeps.fetch = origFetch;
  }
});

test("badge check: an active member with the badge is not touched beyond the badge itself", async () => {
  reset({ forge_badges: [{ user_id: "u3", statut: "verifie", tentatives_echec: 0 }] });
  const origFetch = badgeDeps.fetch;
  badgeDeps.fetch = (async () => new Response('<a href="https://noxelseo.com">NOXEL</a>', { status: 200 })) as any;
  try {
    await traiterVerificationBadge("u3", "https://site.com");
    assert.ok(!writes.some((w) => w.row.statut === "actif"), "no reactivation write");
    assert.ok(!writes.some((w) => w.table === "forge_submissions"), "submissions untouched");
  } finally {
    badgeDeps.fetch = origFetch;
  }
});
