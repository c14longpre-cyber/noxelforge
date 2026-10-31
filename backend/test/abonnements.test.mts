// Subscriptions: CAD prices, status → tier, one refund per customer — runs against the compiled code
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

process.env.FORGE_JWT_SECRET = "test-secret";
process.env.FORGE_PRICE_SILVER_MONTHLY = "price_cad_silver_m";
process.env.FORGE_PRICE_GOLD_ANNUAL = "price_cad_gold_y";
const require = createRequire(import.meta.url);
const supabaseClient = require("../dist/lib/supabaseClient.js");
const svc = require("../dist/services/forge/stripe.forge.service.js");
const remb = require("../dist/services/forge/remboursement.service.js");

test("new checkouts use the CAD price from the environment, never the former USD one", () => {
  assert.equal(svc.prixCheckout("silver", "monthly"), "price_cad_silver_m");
  assert.equal(svc.prixCheckout("gold", "annual"), "price_cad_gold_y");
  assert.equal(svc.prixCheckout("platinum", "monthly"), null, "not configured → no checkout");
  assert.equal(svc.prixCheckout("bronze", "monthly"), null);
});

test("existing USD subscriptions and new CAD ones are both recognized", () => {
  assert.equal(svc.tierDuPrix("price_cad_silver_m"), "silver");
  assert.equal(svc.tierDuPrix("price_1TnJ6hFty4wGWMC7Wnoj1my4"), "gold");
  assert.equal(svc.tierDuPrix("price_unknown"), null);
});

test("subscription status decides the tier; an unknown price never downgrades", () => {
  assert.equal(svc.tierPourAbonnement("active", "gold"), "gold");
  assert.equal(svc.tierPourAbonnement("active", null), "garder");
  assert.equal(svc.tierPourAbonnement("past_due", "gold"), "garder");
  assert.equal(svc.tierPourAbonnement("unpaid", "gold"), "bronze");
  assert.equal(svc.tierPourAbonnement("canceled", "gold"), "bronze");
});

// Minimal fake: forge_refunds rows filtered by eq()
let refunds: any[] = [];
supabaseClient.getSupabase = () => ({
  from() {
    const f: [string, unknown][] = [];
    const q: any = {
      select: () => q,
      eq: (c: string, v: unknown) => { f.push([c, v]); return q; },
      then: (ok: any, ko: any) => Promise.resolve({ data: refunds.filter((r) => f.every(([c, v]) => r[c] === v)), error: null }).then(ok, ko),
    };
    return q;
  },
});

test("the 14-day refund is once per customer", async () => {
  refunds = [];
  assert.equal(await remb.remboursementDejaUtilise("cus_1", "sub_2"), false);
  refunds = [{ stripe_customer_id: "cus_1", stripe_subscription_id: "sub_1", statut: "rembourse" }];
  assert.equal(await remb.remboursementDejaUtilise("cus_1", "sub_2"), true, "a second subscription is not refunded");
  assert.equal(await remb.remboursementDejaUtilise("cus_1", "sub_1"), false, "the same subscription keeps its own row");
  assert.equal(await remb.remboursementDejaUtilise("cus_2", "sub_9"), false);
});

test("the Forge webhook only acts on Forge objects when the Stripe account is shared with NOXEL SEO / SPECTRA", () => {
  // Checkout sessions
  assert.equal(svc.sessionForge({ product: "forge", userId: "u", tier: "gold" }), true);
  assert.equal(svc.sessionForge({ userId: "u", tier: "gold", billing: "monthly", badgeInstalle: "false" }), true, "former Forge checkout");
  assert.equal(svc.sessionForge({ tier: "gold", userId: "u" }), false, "NOXEL SEO checkout");
  assert.equal(svc.sessionForge({ product: "spectra", spectraUserId: "u", spectraTier: "gold" }), false, "NOXEL SPECTRA checkout");
  // Subscriptions: never a Forge plan, an immediate cancellation or a 14-day refund on another product's subscription
  assert.equal(svc.abonnementForge({ metadata: {}, items: { data: [{ price: { id: "price_cad_silver_m" } }] } }), true);
  assert.equal(svc.abonnementForge({ metadata: {}, items: { data: [{ price: { id: "price_1TnJ6hFty4wGWMC7Wnoj1my4" } }] } }), true, "former USD price");
  assert.equal(svc.abonnementForge({ metadata: { tier: "gold", userId: "u" }, items: { data: [{ price: { id: "price_seo_gold" } }] } }), false);
  assert.equal(svc.abonnementForge({ metadata: { product: "spectra" }, items: { data: [{ price: { id: "price_cad_silver_m" } }] } }), false);
});
