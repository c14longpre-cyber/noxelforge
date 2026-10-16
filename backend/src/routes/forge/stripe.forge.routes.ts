import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import { creerCheckoutForge, gererWebhookForge } from '../../services/forge/stripe.forge.service';
import { requireAuth } from '../../middleware/requireAuth';
import { getSupabase } from '../../lib/supabaseClient';

const router = Router();

router.post('/checkout', requireAuth, async (req: Request, res: Response) => {
  try {
    // badgeInstalle sent by the client is ignored: the badge discount depends on the real badge status
    const { tier, billing } = req.body;
    const userId = (req as any).user?.id;
    const email = (req as any).user?.email;
    if (!userId || !email) return res.status(401).json({ error: 'Non authentifié' });
    const { data: badge, error: badgeError } = await getSupabase()
      .from('forge_badges').select('statut').eq('user_id', userId).maybeSingle();
    if (badgeError) {
      console.error('[checkout] forge_badges:', badgeError.message);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
    const badgeInstalle = badge?.statut === 'verifie';
    const url = await creerCheckoutForge({ userId, email, tier, billing: billing || 'monthly', badgeInstalle });
    res.json({ url });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/webhook', async (req: Request, res: Response) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-06-24.dahlia' });
  const sig = req.headers['stripe-signature'] as string;
  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    await gererWebhookForge(event);
    res.json({ received: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;


