import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import { creerCheckoutForge, gererWebhookForge, creerPortailForge, ErreurAbonnement } from '../../services/forge/stripe.forge.service';
import { requireAuth } from '../../middleware/requireAuth';
import { getSupabase } from '../../lib/supabaseClient';

const router = Router();

router.post('/checkout', requireAuth, async (req: Request, res: Response) => {
  try {
    const { tier, billing } = req.body;
    const userId = (req as any).userId;
    const email = (req as any).user?.email;
    if (!userId || !email) return res.status(401).json({ ok: false, error: 'Non authentifié' });
    // badgeInstalle sent by the client is ignored: the discount applies only to a badge verified by the
    // server (forge_badges.statut 'verifie'; forge_members.badge_installe stays true during the grace period)
    const { data: badge, error: badgeError } = await getSupabase()
      .from('forge_badges').select('statut').eq('user_id', userId).maybeSingle();
    if (badgeError) {
      console.error('[checkout] forge_badges:', badgeError.message);
      return res.status(500).json({ ok: false, error: 'Erreur serveur.' });
    }
    const url = await creerCheckoutForge({ userId, email, tier, billing: billing === 'annual' ? 'annual' : 'monthly', badgeInstalle: badge?.statut === 'verifie' });
    res.json({ ok: true, url });
  } catch (err: any) {
    if (err instanceof ErreurAbonnement) return res.status(err.status).json({ ok: false, code: err.code, error: err.message });
    res.status(400).json({ ok: false, error: err.message });
  }
});

// POST /api/forge/stripe/portal — the member's own Stripe customer, from the session
router.post('/portal', requireAuth, async (req: Request, res: Response) => {
  try {
    res.json({ ok: true, url: await creerPortailForge((req as any).userId) });
  } catch (err: any) {
    if (err instanceof ErreurAbonnement) return res.status(err.status).json({ ok: false, code: err.code, error: err.message });
    console.error('[portal]', err?.message ?? err);
    res.status(500).json({ ok: false, error: 'Billing portal unavailable.' });
  }
});

// Monté directement dans index.ts AVANT express.json() : Stripe signe le corps brut.
export async function stripeWebhookHandler(req: Request, res: Response) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-06-24.dahlia' });
  const sig = req.headers['stripe-signature'] as string;
  if (!sig) return res.status(400).json({ ok: false, error: 'Missing stripe-signature header' });
  if (!Buffer.isBuffer(req.body)) return res.status(400).json({ ok: false, error: 'Raw body required' });
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    // Bad signature or payload: retrying would not help
    console.error('[Stripe Webhook Error]', err.message);
    return res.status(400).json({ ok: false, error: err.message });
  }
  try {
    await gererWebhookForge(event);
    res.json({ received: true });
  } catch (err: any) {
    // Processing failed (e.g. Supabase error): 500 so Stripe retries instead of considering it done
    console.error(`[stripe webhook] ${event.type} ${event.id} failed:`, err?.message ?? err);
    res.status(500).json({ ok: false, error: 'Webhook processing failed.' });
  }
}

export default router;


