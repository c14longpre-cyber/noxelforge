import Stripe from 'stripe';
import { getSupabase } from '../../lib/supabaseClient';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-06-24.dahlia' });
}

export const FORGE_PRICES = {
  bronze:   { monthly: 'price_1TnIqOFty4wGWMC7heqNrSkn', annual: null },
  silver:   { monthly: 'price_1TnIzHFty4wGWMC7lamEhdh9', annual: 'price_1TnJ1TFty4wGWMC77RYZQmBV' },
  gold:     { monthly: 'price_1TnJ6hFty4wGWMC7Wnoj1my4', annual: 'price_1TnJ7bFty4wGWMC7HCzF42e6' },
  platinum: { monthly: 'price_1TnJ9UFty4wGWMC7xpPNyet9', annual: 'price_1TnJA7Fty4wGWMC7LzOKYgFk' },
  diamond:  { monthly: 'price_1TnJBeFty4wGWMC7HuONtpNM', annual: 'price_1TnJCIFty4wGWMC7PEJ1BLxr' },
};

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

  const priceId = FORGE_PRICES[tier as keyof typeof FORGE_PRICES]?.[billing];
  if (!priceId) throw new Error(`Invalid tier or billing: ${tier} / ${billing}`);

  const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];
  if (badgeInstalle && BADGE_COUPONS[tier]) {
    discounts.push({ coupon: BADGE_COUPONS[tier] });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    discounts: discounts.length > 0 ? discounts : undefined,
    metadata: { userId, tier, billing, badgeInstalle: String(badgeInstalle) },
    success_url: `${process.env.FRONTEND_URL}/forge/dashboard?success=true&tier=${tier}`,
    cancel_url: `${process.env.FRONTEND_URL}/forge/pricing?cancelled=true`,
  });

  return session.url!;
}

export async function gererWebhookForge(event: Stripe.Event): Promise<void> {
  const supabase = getSupabase();

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const { userId, tier } = session.metadata || {};
    if (!userId || !tier) return;

    await supabase.from('forge_members').upsert({
      user_id: userId,
      tier_abonnement: tier,
      stripe_customer_id: session.customer as string,
      stripe_subscription_id: session.subscription as string,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription;
    const customerId = sub.customer as string;
    await supabase.from('forge_members')
      .update({ tier_abonnement: 'bronze', stripe_subscription_id: null, updated_at: new Date().toISOString() })
      .eq('stripe_customer_id', customerId);
  }
}
