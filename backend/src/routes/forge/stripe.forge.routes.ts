import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import { creerCheckoutForge, gererWebhookForge } from '../../services/forge/stripe.forge.service';
import { requireAuth } from '../../middleware/requireAuth';
import { getSupabase } from '../../lib/supabaseClient';

const router = Router();

router.post('/checkout', requireAuth, async (req: Request, res: Response) => {
  try {
    const { tier, billing } = req.body;
    const userId = (req as any).userId;
    const email = (req as any).user?.email;
    if (!userId || !email) return res.status(401).json({ ok: false, error: 'Non authentifié' });
    // La remise badge n'est accordée que si le badge a été vérifié côté serveur.
    const { data: membre } = await getSupabase().from('forge_members').select('badge_installe').eq('user_id', userId).maybeSingle();
    const url = await creerCheckoutForge({ userId, email, tier, billing: billing === 'annual' ? 'annual' : 'monthly', badgeInstalle: membre?.badge_installe === true });
    res.json({ ok: true, url });
  } catch (err: any) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Monté directement dans index.ts AVANT express.json() : Stripe signe le corps brut.
export async function stripeWebhookHandler(req: Request, res: Response) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-06-24.dahlia' });
  const sig = req.headers['stripe-signature'] as string;
  if (!sig) return res.status(400).json({ ok: false, error: 'Missing stripe-signature header' });
  if (!Buffer.isBuffer(req.body)) return res.status(400).json({ ok: false, error: 'Raw body required' });
  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    await gererWebhookForge(event);
    res.json({ received: true });
  } catch (err: any) {
    console.error('[Stripe Webhook Error]', err.message);
    res.status(400).json({ ok: false, error: err.message });
  }
}

export default router;


