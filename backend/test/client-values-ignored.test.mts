// Values sent by the client must never set a score, a tier or a badge discount.
// Runs against the compiled routes (npm test builds first) with the real requireAuth,
// a fake Supabase client and a stubbed Stripe checkout.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import type { AddressInfo } from "node:net";

process.env.FORGE_JWT_SECRET = "test-secret";
process.env.ANTHROPIC_API_KEY ??= "test";
process.env.STRIPE_SECRET_KEY ??= "sk_test_dummy";

const require = createRequire(import.meta.url);
const express = require("express");
const cookieParser = require("cookie-parser");
const supabaseClient = require("../dist/lib/supabaseClient.js");
const stripeService = require("../dist/services/forge/stripe.forge.service.js");
const { createSession } = require("../dist/services/session.js");

// ─── Fake Supabase: in-memory tables, every write recorded ──────────────────
type Row = Record<string, any>;
let tables: Record<string, Row[]> = {};
let writes: { table: string; op: string; row: Row }[] = [];
let failTable: string | null = null;

function fakeSupabase() {
  return {
    from(table: string) {
      const filters: [string, unknown][] = [];
      let op = "select";
      let payload: Row | null = null;
      const run = () => {
        if (failTable === table) return { data: null, error: { message: "boom" } };
        if (op !== "select") {
          writes.push({ table, op, row: payload! });
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

// ─── Stubbed Stripe checkout: records what the route passes ─────────────────
let checkoutCalls: any[] = [];
stripeService.creerCheckoutForge = async (params: any) => {
  checkoutCalls.push(params);
  return "https://checkout.stripe.test/session";
};

// Routes are required after the stubs so they bind to them
const forgeRoutes = require("../dist/routes/forge/forge.routes.js").default;
const stripeRoutes = require("../dist/routes/forge/stripe.forge.routes.js").default;

function reset() {
  tables = {
    users: [{ id: "u-grace", email: "grace@test" }, { id: "u-ok", email: "ok@test" }, { id: "u-new", email: "new@test" }],
    forge_badges: [{ user_id: "u-grace", statut: "grace" }, { user_id: "u-ok", statut: "verifie" }],
    forge_members: [],
  };
  writes = [];
  failTable = null;
  checkoutCalls = [];
}

async function call(method: string, path: string, body: unknown, userId?: string) {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  app.use("/api/forge/stripe", stripeRoutes);
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

const allSignals = {
  scoresTechnique: 100, domainAuthority: 100, spamScore: 0,
  qualiteContenu: 100, ageDomaineAnnees: 20, publicationsParMois: 30,
};

// 1. Trust Score recalculation is disabled
test("recalculate: refused with 403 (anonymous or logged in), nothing written", async () => {
  for (const user of [undefined, "u-ok"]) {
    reset();
    const r = await call("POST", "/api/forge/trust-score/recalculate", allSignals, user);
    assert.equal(r.status, 403, `user=${user}`);
    assert.deepEqual(r.body, { ok: false, error: "Recalcul désactivé : le score sera calculé par le serveur." });
    assert.deepEqual(writes, []);
  }
});

// 2. Checkout requires a session
test("checkout: an anonymous call gets 401 and never reaches Stripe", async () => {
  reset();
  const r = await call("POST", "/api/forge/stripe/checkout", { tier: "gold", billing: "monthly", badgeInstalle: true });
  assert.equal(r.status, 401);
  assert.deepEqual(checkoutCalls, []);
});

// 3. Registration always starts on the free tier
test("register: tier_abonnement sent by the client is ignored, the member starts on bronze", async () => {
  reset();
  const r = await call("POST", "/api/forge/members/register",
    { url_site: "https://exemple.ca", niche: "plein-air", tier_abonnement: "diamond" }, "u-new");
  assert.equal(r.status, 201);
  const insert = writes.find((w) => w.table === "forge_members" && w.op === "insert");
  assert.equal(insert?.row.tier_abonnement, "bronze");
  assert.equal(insert?.row.user_id, "u-new");
});

// 3b. The Stripe webhook is what sets the paid tier (already the case, checked here)
test("webhook: checkout.session.completed sets the paid tier from the session metadata", async () => {
  reset();
  await stripeService.gererWebhookForge({
    type: "checkout.session.completed",
    data: { object: { metadata: { userId: "u-new", tier: "gold" }, customer: "cus_1", subscription: "sub_1" } },
  });
  const upsert = writes.find((w) => w.table === "forge_members" && w.op === "upsert");
  assert.equal(upsert?.row.user_id, "u-new");
  assert.equal(upsert?.row.tier_abonnement, "gold");
});

// 4. The badge discount follows forge_badges, not the client
test("checkout: badgeInstalle sent by the client is ignored, forge_badges.statut decides", async () => {
  reset();
  await call("POST", "/api/forge/stripe/checkout", { tier: "gold", billing: "monthly", badgeInstalle: true }, "u-grace");
  await call("POST", "/api/forge/stripe/checkout", { tier: "gold", billing: "monthly", badgeInstalle: false }, "u-ok");
  await call("POST", "/api/forge/stripe/checkout", { tier: "gold", billing: "monthly", badgeInstalle: true }, "u-new");
  assert.deepEqual(checkoutCalls.map((c) => [c.userId, c.badgeInstalle]), [
    ["u-grace", false], // client said true, badge only in grace period
    ["u-ok", true],     // client said false, badge verified
    ["u-new", false],   // client said true, no badge row
  ]);
});

test("checkout: a forge_badges error stops the checkout (500), no discount guessed", async () => {
  reset();
  failTable = "forge_badges";
  const r = await call("POST", "/api/forge/stripe/checkout", { tier: "gold", billing: "monthly", badgeInstalle: true }, "u-ok");
  assert.equal(r.status, 500);
  assert.deepEqual(checkoutCalls, []);
});
