// Automatic 14-day refund: window, single refund per subscription, failure handling, cancel-at-period-end,
// and the webhook path. Fake Stripe and fake Supabase: no network, no real money moves.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import type { AddressInfo } from "node:net";
const NOT_NULL = Symbol('not null');

process.env.FORGE_JWT_SECRET = "test-secret";
process.env.STRIPE_SECRET_KEY = "sk_test_dummy";
process.env.STRIPE_WEBHOOK_SECRET = "whsec_test_secret";

const require = createRequire(import.meta.url);
const express = require("express");
const Stripe = require("stripe");
const supabaseClient = require("../dist/lib/supabaseClient.js");
const remb = require("../dist/services/forge/remboursement.service.js");

// ─── Fake Supabase ──────────────────────────────────────────────────────────
type Row = Record<string, any>;
let tables: Record<string, Row[]> = {};
supabaseClient.getSupabase = () => ({
  from(table: string) {
    const filters: [string, unknown][] = [];
    let op = "select"; let payload: Row | null = null;
    const rows = () => (tables[table] ??= []);
    const match = (r: Row) => filters.every(([c, v]) => (v === NOT_NULL ? r[c] != null : r[c] === v));
    const run = () => {
      if (op === "upsert") { rows().push({ ...payload }); return { data: null, error: null }; }
      if (op === "update") { const m = rows().filter(match); m.forEach((r) => Object.assign(r, payload)); return { data: m, error: null }; }
      return { data: rows().filter(match), error: null };
    };
    const q: any = {
      select: () => q,
      eq: (c: string, v: unknown) => { filters.push([c, v]); return q; },
        not: (c: string) => { filters.push([c, NOT_NULL]); return q; }, // .not(c, 'is', null)
      upsert: (p: Row) => { op = "upsert"; payload = p; return q; },
      update: (p: Row) => { op = "update"; payload = p; return q; },
      maybeSingle: () => Promise.resolve({ data: run().data?.[0] ?? null, error: null }),
      then: (ok: any, ko: any) => Promise.resolve(run()).then(ok, ko),
    };
    return q;
  },
});

// ─── Fake Stripe ────────────────────────────────────────────────────────────
let calls: { op: string; args: any[] }[] = [];
let paiements: any[] = [];
let refundError: Error | null = null;
remb.remboursementDeps.stripe = () => ({
  invoicePayments: { list: async (...args: any[]) => { calls.push({ op: "invoicePayments.list", args }); return { data: paiements }; } },
  refunds: { create: async (...args: any[]) => {
    calls.push({ op: "refunds.create", args });
    if (refundError) throw refundError;
    return { id: "re_1", amount: 2000, currency: "cad" };
  } },
  subscriptions: { cancel: async (...args: any[]) => { calls.push({ op: "subscriptions.cancel", args }); return {}; } },
});

const JOUR = 86400;
const START = 1_790_000_000;
const sub = (canceledDays: number | null, extra: Row = {}) => ({
  id: "sub_1", customer: "cus_1", latest_invoice: "in_1", start_date: START,
  canceled_at: canceledDays === null ? null : START + canceledDays * JOUR, ...extra,
});

function reset() {
  tables = { forge_members: [{ user_id: "u-1", stripe_customer_id: "cus_1" }], forge_refunds: [] };
  calls = []; refundError = null;
  paiements = [{ payment: { type: "payment_intent", payment_intent: "pi_1" } }];
}

test("window: cancelled at day 14 is refunded, day 15 is not, a missing start date never is", () => {
  assert.equal(remb.annuleeDansFenetre(sub(0)), true);
  assert.equal(remb.annuleeDansFenetre(sub(14)), true);
  assert.equal(remb.annuleeDansFenetre(sub(14.01)), false);
  assert.equal(remb.annuleeDansFenetre({ id: "s", customer: "c", latest_invoice: null }), false);
  // not cancelled yet: compared with now
  assert.equal(remb.annuleeDansFenetre(sub(null), START + 3 * JOUR), true);
});

test("cancelled within 14 days: the last paid invoice is refunded once, with an idempotency key, and stored", async () => {
  reset();
  assert.equal(await remb.rembourserAnnulation(sub(3)), "rembourse");
  const refund = calls.find((c) => c.op === "refunds.create")!;
  assert.equal(refund.args[0].payment_intent, "pi_1");
  assert.equal(refund.args[0].reason, "requested_by_customer");
  assert.deepEqual(refund.args[1], { idempotencyKey: "forge-refund-sub_1" });
  assert.deepEqual(calls[0], { op: "invoicePayments.list", args: [{ invoice: "in_1", status: "paid", limit: 1 }] });
  const row = tables.forge_refunds[0];
  assert.equal(row.statut, "rembourse");
  assert.equal(row.user_id, "u-1");
  assert.equal(row.refund_id, "re_1");
  assert.equal(row.montant, 2000);

  calls = [];
  assert.equal(await remb.rembourserAnnulation(sub(3)), "rembourse", "a webhook retry returns the stored outcome");
  assert.deepEqual(calls, [], "no second refund");
});

test("cancelled after 14 days: no Stripe call, nothing stored", async () => {
  reset();
  assert.equal(await remb.rembourserAnnulation(sub(20)), null);
  assert.deepEqual(calls, []);
  assert.deepEqual(tables.forge_refunds, []);
});

test("no paid payment on the last invoice (100% coupon, unpaid): stored as aucun_paiement, nothing refunded", async () => {
  reset();
  paiements = [];
  assert.equal(await remb.rembourserAnnulation(sub(2)), "aucun_paiement");
  assert.ok(!calls.some((c) => c.op === "refunds.create"));
  assert.equal(tables.forge_refunds[0].raison, "Aucun paiement encaissé sur la dernière facture");
});

test("payment made with a charge (no PaymentIntent): refunded through the charge", async () => {
  reset();
  paiements = [{ payment: { type: "charge", charge: "ch_1" } }];
  assert.equal(await remb.rembourserAnnulation(sub(2)), "rembourse");
  assert.equal(calls.find((c) => c.op === "refunds.create")!.args[0].charge, "ch_1");
});

test("Stripe refuses (already refunded): stored as echec with the reason, no throw, so retries stop", async () => {
  reset();
  refundError = new Stripe.errors.StripeInvalidRequestError({ message: "Charge ch_1 has already been refunded." });
  assert.equal(await remb.rembourserAnnulation(sub(2)), "echec");
  assert.equal(tables.forge_refunds[0].raison, "Charge ch_1 has already been refunded.");
});

test("Stripe unreachable: throws (webhook answers 500, Stripe retries), nothing stored", async () => {
  reset();
  refundError = new Stripe.errors.StripeConnectionError({ message: "socket hang up" });
  await assert.rejects(remb.rembourserAnnulation(sub(2)));
  assert.deepEqual(tables.forge_refunds, []);
});

test("cancel at period end requested within 14 days: cancelled now (which triggers the refund); not after 14 days", async () => {
  reset();
  const demande = (days: number) => ({ ...sub(days), status: "active", cancel_at_period_end: true });
  assert.equal(await remb.annulerMaintenantSiDansFenetre(demande(5), { cancel_at_period_end: false }), true);
  assert.deepEqual(calls, [{ op: "subscriptions.cancel", args: ["sub_1", { prorate: false }] }]);
  calls = [];
  assert.equal(await remb.annulerMaintenantSiDansFenetre(demande(20), { cancel_at_period_end: false }), false);
  assert.equal(await remb.annulerMaintenantSiDansFenetre(demande(5), undefined), false, "no change in this event");
  assert.deepEqual(calls, []);
});

// ─── Webhook path ───────────────────────────────────────────────────────────
const { stripeWebhookHandler } = require("../dist/routes/forge/stripe.forge.routes.js");
const signer = new Stripe("sk_test_dummy");

async function send(event: object) {
  const app = express();
  app.post("/api/forge/stripe/webhook", express.raw({ type: "application/json" }), stripeWebhookHandler);
  const server = app.listen(0);
  try {
    const payload = JSON.stringify(event);
    const signature = signer.webhooks.generateTestHeaderString({ payload, secret: process.env.STRIPE_WEBHOOK_SECRET });
    const res = await fetch(`http://127.0.0.1:${(server.address() as AddressInfo).port}/api/forge/stripe/webhook`, {
      method: "POST", headers: { "Content-Type": "application/json", "stripe-signature": signature }, body: payload,
    });
    return res.status;
  } finally {
    server.close();
  }
}

test("webhook customer.subscription.deleted within 14 days: member back to bronze and refunded", async () => {
  reset();
  tables.forge_members[0].stripe_subscription_id = "sub_1";
  tables.forge_members[0].tier_abonnement = "gold";
  const nowS = Math.floor(Date.now() / 1000);
  const status = await send({
    id: "evt_1", object: "event", type: "customer.subscription.deleted",
    data: { object: { id: "sub_1", object: "subscription", customer: "cus_1", latest_invoice: "in_1", start_date: nowS - 2 * JOUR, canceled_at: nowS } },
  });
  assert.equal(status, 200);
  assert.equal(tables.forge_members[0].tier_abonnement, "bronze");
  assert.equal(tables.forge_refunds[0]?.statut, "rembourse");
});
