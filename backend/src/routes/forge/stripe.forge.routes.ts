import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import { creerCheckoutForge, gererWebhookForge } from '../services/forge/stripe.forge.service';

const router = Router();

router.post('/checkout', async (req: Request, res: Response) => {
  try {
    const { tier, billing, badgeInstalle } = req.body;
    const userId = (req as any).user?.id;
    const email = (req as any).user?.email;
    if (!userId || !email) return res.status(401).json({ error: 'Non authentifié' });
    const url = await creerCheckoutForge({ userId, email, tier, billing: billing || 'monthly', badgeInstalle: !!badgeInstalle });
    res.json({ url });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/webhook', async (req: Request, res: Response) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });
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
