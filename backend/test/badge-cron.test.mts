// Badge cron: daily run, full check on the 1st/15th (Toronto time), grace members only the other days.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

process.env.FORGE_JWT_SECRET = "test-secret";
process.env.ANTHROPIC_API_KEY ??= "test";

const require = createRequire(import.meta.url);
const supabaseClient = require("../dist/lib/supabaseClient.js");
const badgeChecker = require("../dist/services/forge/badgeChecker.service.js");
const { estJourVerificationComplete, runForgeBadgeCron } = require("../dist/cron/forgeBadgeCron.js");

type Row = Record<string, any>;
let tables: Record<string, Row[]> = {};

function fakeSupabase() {
  return {
    from(table: string) {
      const preds: ((r: Row) => boolean)[] = [];
      const q: any = {
        select: () => q,
        eq: (c: string, v: unknown) => { preds.push((r) => r[c] === v); return q; },
        in: (c: string, vs: unknown[]) => { preds.push((r) => vs.includes(r[c])); return q; },
        not: (c: string, _op: string, _v: null) => { preds.push((r) => r[c] != null); return q; },
        then: (ok: any, ko: any) => Promise.resolve({ data: (tables[table] ?? []).filter((r) => preds.every((p) => p(r))), error: null }).then(ok, ko),
      };
      return q;
    },
  };
}
supabaseClient.getSupabase = fakeSupabase;

const MEMBRES = [
  { user_id: "a", url_site: "https://a.com", statut: "actif" },
  { user_id: "b", url_site: "https://b.com", statut: "actif" },
  { user_id: "c", url_site: "https://c.com", statut: "suspendu" },
];

async function membresVerifies(opts: { seulementGrace?: boolean }) {
  const vus: string[] = [];
  const orig = badgeChecker.traiterVerificationBadge;
  badgeChecker.traiterVerificationBadge = async (userId: string) => { vus.push(userId); return { present: true, statut: "verifie", message: "" }; };
  try { await runForgeBadgeCron(opts); } finally { badgeChecker.traiterVerificationBadge = orig; }
  return vus.sort();
}

test("full check day: the 1st and the 15th, Toronto time", () => {
  assert.equal(estJourVerificationComplete(new Date("2026-11-01T14:00:00Z")), true);
  assert.equal(estJourVerificationComplete(new Date("2026-11-15T14:00:00Z")), true);
  assert.equal(estJourVerificationComplete(new Date("2026-11-02T14:00:00Z")), false);
  // 03:00 UTC on Nov 1 is still Oct 31 in Toronto
  assert.equal(estJourVerificationComplete(new Date("2026-11-01T03:00:00Z")), false);
});

test("full run checks every active or suspended member with a site", async () => {
  tables = { forge_members: MEMBRES, forge_badges: [{ user_id: "b", statut: "grace" }] };
  assert.deepEqual(await membresVerifies({}), ["a", "b", "c"]);
});

test("grace-only run checks only members whose badge is in grace", async () => {
  tables = { forge_members: MEMBRES, forge_badges: [{ user_id: "a", statut: "verifie" }, { user_id: "b", statut: "grace" }, { user_id: "c", statut: "suspendu" }] };
  assert.deepEqual(await membresVerifies({ seulementGrace: true }), ["b"]);
});

test("grace-only run with nobody in grace checks no one", async () => {
  tables = { forge_members: MEMBRES, forge_badges: [{ user_id: "a", statut: "verifie" }] };
  assert.deepEqual(await membresVerifies({ seulementGrace: true }), []);
});
