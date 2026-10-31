// Stripe webhook: a Supabase error must answer 500 (Stripe retries), never 200.
// Runs against the compiled route (npm test builds first), with events signed like Stripe does
// and a fake Supabase client.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import type { AddressInfo } from "node:net";

process.env.FORGE_JWT_SECRET = "test-secret";
process.env.STRIPE_SECRET_KEY = "sk_test_dummy";
process.env.STRIPE_WEBHOOK_SECRET = "whsec_test_secret";

const require = createRequire(import.meta.url);
const express = require("express");
const Stripe = require("stripe");
const supabaseClient = require("../dist/lib/supabaseClient.js");
const { must, SupabaseError } = require("../dist/lib/supabaseCheck.js");

// ─── Fake Supabase: records each query, can fail on demand ──────────────────
type Query = { table: string; op: string; payload: any; filters: [string, string, unknown][] };
let queries: Query[] = [];
let fail = false;
let updatedRows: any[] = [];

supabaseClient.getSupabase = () => ({
  from(table: string) {
    const q: Query = { table, op: "select", payload: null, filters: [] };
    queries.push(q);
    const result = () => fail
      ? { data: null, error: { message: 'column "stripe_customer_id" does not exist' } }
      : { data: q.op === "update" ? updatedRows : null, error: null };
    const chain: any = {
      upsert: (p: any) => { q.op = "upsert"; q.payload = p; return chain; },
      update: (p: any) => { q.op = "update"; q.payload = p; return chain; },
      eq: (c: string, v: unknown) => { q.filters.push(["eq", c, v]); return chain; },
      select: () => chain,
      then: (ok: any, ko: any) => Promise.resolve(result()).then(ok, ko),
    };
    return chain;
  },
});

const { stripeWebhookHandler } = require("../dist/routes/forge/stripe.forge.routes.js");
const stripe = new Stripe("sk_test_dummy");

async function send(event: object, { badSignature = false } = {}) {
  // Same mounting as index.ts: the handler gets the raw body, before express.json()
  const app = express();
  app.post("/api/forge/stripe/webhook", express.raw({ type: "application/json" }), stripeWebhookHandler);
  app.use(express.json());
  const server = app.listen(0);
  try {
    const payload = JSON.stringify(event);
    const signature = stripe.webhooks.generateTestHeaderString({
      payload, secret: badSignature ? "whsec_wrong" : process.env.STRIPE_WEBHOOK_SECRET,
    });
    const res = await fetch(`http://127.0.0.1:${(server.address() as AddressInfo).port}/api/forge/stripe/webhook`, {
      method: "POST", headers: { "Content-Type": "application/json", "stripe-signature": signature }, body: payload,
    });
    return { status: res.status, body: await res.json() };
  } finally {
    server.close();
  }
}

const completed = {
  id: "evt_completed", object: "event", type: "checkout.session.completed",
  data: { object: { id: "cs_1", object: "checkout.session", customer: "cus_1", subscription: "sub_1", metadata: { product: "forge", userId: "u-1", tier: "gold" } } },
};
const deleted = {
  id: "evt_deleted", object: "event", type: "customer.subscription.deleted",
  data: { object: { id: "sub_1", object: "subscription", customer: "cus_1", metadata: { product: "forge" } } },
};

function reset() { queries = []; fail = false; updatedRows = [{ user_id: "u-1" }]; }

test("checkout.session.completed: a Supabase error answers 500, not 200", async () => {
  reset();
  fail = true;
  const r = await send(completed);
  assert.equal(r.status, 500);
  assert.deepEqual(r.body, { ok: false, error: "Webhook processing failed." });
  assert.equal(queries.length, 1, "the upsert was attempted");
});

test("checkout.session.completed: sets the paid tier and the Stripe ids, answers 200", async () => {
  reset();
  const r = await send(completed);
  assert.equal(r.status, 200);
  assert.deepEqual(r.body, { received: true });
  const q = queries[0];
  assert.equal(q.table, "forge_members");
  assert.equal(q.op, "upsert");
  assert.equal(q.payload.user_id, "u-1");
  assert.equal(q.payload.tier_abonnement, "gold");
  assert.equal(q.payload.stripe_customer_id, "cus_1");
  assert.equal(q.payload.stripe_subscription_id, "sub_1");
});

test("customer.subscription.deleted: finds the member by stripe_subscription_id and sets bronze", async () => {
  reset();
  const r = await send(deleted);
  assert.equal(r.status, 200);
  const q = queries[0];
  assert.equal(q.op, "update");
  assert.equal(q.payload.tier_abonnement, "bronze");
  assert.equal(q.payload.stripe_subscription_id, null);
  assert.deepEqual(q.filters, [["eq", "stripe_subscription_id", "sub_1"]]);
});

test("customer.subscription.deleted: a Supabase error answers 500, not 200", async () => {
  reset();
  fail = true;
  const r = await send(deleted);
  assert.equal(r.status, 500);
});

test("a bad signature answers 400 and touches nothing", async () => {
  reset();
  const r = await send(completed, { badSignature: true });
  assert.equal(r.status, 400);
  assert.deepEqual(queries, []);
});

test("must(): returns data, throws SupabaseError on { error }", () => {
  assert.deepEqual(must({ data: [1], error: null }, "t select"), [1]);
  assert.equal(must({ data: null, error: null }, "t select"), null);
  assert.throws(() => must({ data: null, error: { message: "boom" } }, "t select"), (e: any) =>
    e instanceof SupabaseError && e.message === "[supabase] t select: boom");
});
