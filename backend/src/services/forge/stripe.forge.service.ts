import Stripe from 'stripe';
import { getSupabase } from '../../lib/supabaseClient';
import { rembourserAnnulation, annulerMaintenantSiDansFenetre } from './remboursement.service';
import { must } from '../../lib/supabaseCheck';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-06-24.dahlia' });
}

// Prices are in Canadian dollars (CAD), same amounts as before (Silver 20, Gold 40, Platinum 60, Diamond
// 80 / month; 199, 399, 599, 799 / year). A Stripe price cannot change currency: the CAD prices are new
// prices created in the Stripe dashboard and given here through FORGE_PRICE_<TIER>_<MONTHLY|ANNUAL>.
// The ids below are the former USD prices, kept so existing subscriptions are still recognized.
const env = (k: string) => (process.env[k] || '').trim() || null;
export const FORGE_PRICES_USD = {
  bronze:   { monthly: 'price_1TnIqOFty4wGWMC7heqNrSkn', annual: null },
  silver:   { monthly: 'price_1TnIzHFty4wGWMC7lamEhdh9', annual: 'price_1TnJ1TFty4wGWMC77RYZQmBV' },
  gold:     { monthly: 'price_1TnJ6hFty4wGWMC7Wnoj1my4', annual: 'price_1TnJ7bFty4wGWMC7HCzF42e6' },
  platinum: { monthly: 'price_1TnJ9UFty4wGWMC7xpPNyet9', annual: 'price_1TnJA7Fty4wGWMC7LzOKYgFk' },
  diamond:  { monthly: 'price_1TnJBeFty4wGWMC7HuONtpNM', annual: 'price_1TnJCIFty4wGWMC7PEJ1BLxr' },
};
export type TierPayant = 'silver' | 'gold' | 'platinum' | 'diamond';
const TIERS_PAYANTS: TierPayant[] = ['silver', 'gold', 'platinum', 'diamond'];

/** Price used for a NEW checkout: the CAD price from the environment (never the former USD one). */
export function prixCheckout(tier: string, billing: 'monthly' | 'annual'): string | null {
  if (!TIERS_PAYANTS.includes(tier as TierPayant)) return null;
  return env(`FORGE_PRICE_${tier.toUpperCase()}_${billing.toUpperCase()}`);
}

/** Paid tier of a subscription's price: CAD prices (environment) or former USD ones. */
export function tierDuPrix(priceId: string | null | undefined): TierPayant | null {
  if (!priceId) return null;
  for (const tier of TIERS_PAYANTS) {
    const ids = [env(`FORGE_PRICE_${tier.toUpperCase()}_MONTHLY`), env(`FORGE_PRICE_${tier.toUpperCase()}_ANNUAL`),
      FORGE_PRICES_USD[tier].monthly, FORGE_PRICES_USD[tier].annual];
    if (ids.includes(priceId)) return tier;
  }
  return null;
}

/**
 * Tier given by a subscription status: active / trialing → its paid tier; past_due / incomplete → no
 * change (Stripe is still retrying); unpaid / canceled / incomplete_expired / paused → bronze. An unknown
 * price never downgrades a paying member (it used to set bronze).
 */
export function tierPourAbonnement(status: string | null | undefined, tier: TierPayant | null): TierPayant | 'bronze' | 'garder' {
  if (status === 'active' || status === 'trialing') return tier ?? 'garder';
  if (status === 'unpaid' || status === 'canceled' || status === 'incomplete_expired' || status === 'paused') return 'bronze';
  return 'garder';
}

// Le compte Stripe peut être partagé avec NOXEL SEO et NOXEL SPECTRA, et chaque webhook reçoit alors
// les événements de tous les produits. FORGE n'agit (forfait, annulation immédiate, remboursement de
// 14 jours) que sur SES objets : metadata.product = "forge" (posé au checkout depuis le 31 oct. 2026),
// sinon un prix FORGE (CAD ou ancien USD), sinon les clés que seul le checkout FORGE a toujours posées.
export const PRODUIT = 'forge';

export function sessionForge(meta: Record<string, string> | null | undefined): boolean {
  if (!meta) return false;
  if (meta.product) return meta.product === PRODUIT;
  return 'badgeInstalle' in meta;  // anciens checkouts FORGE (SEO et SPECTRA ne posent jamais cette clé)
}

export function abonnementForge(sub: { metadata?: Record<string, string> | null; items?: { data?: { price?: { id?: string } | null }[] } }): boolean {
  if (sub.metadata?.product) return sub.metadata.product === PRODUIT;
  return tierDuPrix(sub.items?.data?.[0]?.price?.id) !== null;
}

export class ErreurAbonnement extends Error {
  constructor(public status: number, public code: string, message: string) { super(message); }
}

export const BADGE_COUPONS: Record<string, string> = {
  silver:   'tCq2nCCP',
  gold:     'wRoFACGJ',
  platinum: 'sJcXsXDK',
  diamond:  '6nLRoOhI',
};

export async function creerCheckoutForge(params: {
  userId: string;
  email: string;
  tier: string;
  billing: 'monthly' | 'annual';
  badgeInstalle: boolean;
}): Promise<string> {
  const stripe = getStripe();
  const { userId, email, tier, billing, badgeInstalle } = params;

  if (tier === 'bronze') throw new Error('Bronze is free — no checkout needed.');
  if (!TIERS_PAYANTS.includes(tier as TierPayant)) throw new Error(`Invalid tier: ${tier}`);
  const priceId = prixCheckout(tier, billing);
  if (!priceId) throw new ErreurAbonnement(503, 'price_not_configured', `CAD price not configured for ${tier} / ${billing}`);

  // One subscription per member: changing plan or cancelling goes through the customer portal
  // (a second checkout used to create a second subscription and bill both)
  const membre = must(await getSupabase().from('forge_members').select('tier_abonnement,stripe_customer_id,stripe_subscription_id').eq('user_id', userId).maybeSingle(), 'forge_members select');
  if (membre?.stripe_subscription_id && membre.tier_abonnement !== 'bronze') {
    throw new ErreurAbonnement(409, 'already_subscribed', 'You already have a subscription: change plan or cancel from “Manage subscription”.');
  }

  const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];
  if (badgeInstalle && BADGE_COUPONS[tier]) {
    discounts.push({ coupon: BADGE_COUPONS[tier] });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    ...(membre?.stripe_customer_id ? { customer: membre.stripe_customer_id } : { customer_email: email }),
    client_reference_id: userId,
    line_items: [{ price: priceId, quantity: 1 }],
    discounts: discounts.length > 0 ? discounts : undefined,
    metadata: { product: PRODUIT, userId, tier, billing, badgeInstalle: String(badgeInstalle) },
    subscription_data: { metadata: { product: PRODUIT, userId, tier } },
    success_url: `${process.env.FRONTEND_URL}/forge/dashboard?success=true&tier=${tier}`,
    cancel_url: `${process.env.FRONTEND_URL}/forge/pricing?cancelled=true`,
  });

  return session.url!;
}

export async function gererWebhookForge(event: Stripe.Event): Promise<void> {
  const supabase = getSupabase();

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    if (!sessionForge(session.metadata)) return;  // checkout de NOXEL SEO ou NOXEL SPECTRA
    const { userId, tier } = session.metadata || {};
    if (!userId || !tier) return;

    // A failure throws: the webhook route answers 500 so Stripe retries the event
    must(await supabase.from('forge_members').upsert({
      user_id: userId,
      tier_abonnement: tier,
      stripe_customer_id: session.customer as string,
      stripe_subscription_id: session.subscription as string,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' }), 'forge_members upsert (checkout.session.completed)');
  }

  if (event.type === 'customer.subscription.updated') {
    const sub = event.data.object as Stripe.Subscription;
    if (!abonnementForge(sub)) return;  // abonnement d'un autre produit NOXEL : ni forfait, ni annulation, ni remboursement
    const customerId = sub.customer as string;
    const previousSub = event.data.previous_attributes as any;

    // Extract tier from price.id if available
    const priceId = (sub.items.data?.[0]?.price?.id || '') as string;
    const newTier = tierPourAbonnement(sub.status, tierDuPrix(priceId));

    // Log subscription update
    console.log(`[gererWebhookForge] Subscription updated for customer ${customerId}: ${previousSub?.items?.data?.[0]?.price?.id} → ${priceId}`);

    // Update member tier (past_due / incomplete / unknown price: unchanged)
    if (newTier !== 'garder') {
      must(await supabase.from('forge_members')
        .update({ tier_abonnement: newTier, ...(newTier === 'bronze' ? {} : { stripe_subscription_id: sub.id }), updated_at: new Date().toISOString() })
        .eq('stripe_customer_id', customerId), 'forge_members update (customer.subscription.updated)');
    }

    // Cancellation at period end requested within the 14 days: cancel now -> subscription.deleted -> refund
    if (await annulerMaintenantSiDansFenetre(sub, previousSub)) {
      console.log(`[gererWebhookForge] ${sub.id} cancelled within 14 days: cancelled now for the refund`);
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription;
    if (!abonnementForge(sub)) return;  // jamais de remboursement FORGE sur un abonnement SEO ou SPECTRA

    // Look the member up by the subscription that ended (a customer can have had several)
    const rows = must(await supabase.from('forge_members')
      .update({ tier_abonnement: 'bronze', stripe_subscription_id: null, updated_at: new Date().toISOString() })
      .eq('stripe_subscription_id', sub.id)
      .select('user_id'), 'forge_members update (customer.subscription.deleted)');
    if (!rows?.length) console.warn(`[stripe webhook] subscription.deleted: no member for subscription ${sub.id}`);

    // 14-day no-questions-asked refund: automatic, once per subscription (forge_refunds)
    const remboursement = await rembourserAnnulation(sub);
    if (remboursement) console.log(`[gererWebhookForge] ${sub.id} refund: ${remboursement}`);
  }
}

// Stripe customer portal: cancel, change plan, update the card, see invoices. The portal settings
// (cancellation, plan switching between the CAD prices) are set in the Stripe dashboard.
export async function creerPortailForge(userId: string): Promise<string> {
  const membre = must(await getSupabase().from('forge_members').select('stripe_customer_id').eq('user_id', userId).maybeSingle(), 'forge_members select');
  if (!membre?.stripe_customer_id) throw new ErreurAbonnement(404, 'no_subscription', 'No subscription for this account.');
  const session = await getStripe().billingPortal.sessions.create({
    customer: membre.stripe_customer_id,
    return_url: `${process.env.FRONTEND_URL}/forge/dashboard`,
  });
  return session.url;
}
