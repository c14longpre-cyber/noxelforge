// 14-day no-questions-asked refund (CLAUDE.md: legal requirement). Decision of 2026-10-20: automatic.
// A subscription cancelled within 14 days of its start gets its last paid invoice refunded through
// Stripe, once, and the outcome is stored in forge_refunds (one row per subscription).
import Stripe from 'stripe';
import { getSupabase } from '../../lib/supabaseClient';
import { must } from '../../lib/supabaseCheck';

export const FENETRE_REMBOURSEMENT_JOURS = 14;
const JOUR_S = 24 * 60 * 60;

// Replaced by the tests (no network): the real client is built on first use
export const remboursementDeps = {
  stripe: (): Stripe => new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-06-24.dahlia' }),
};

type Sub = Pick<Stripe.Subscription, 'id' | 'customer' | 'latest_invoice'> &
  Partial<Pick<Stripe.Subscription, 'start_date' | 'created' | 'canceled_at'>>;

const idDe = (v: unknown): string | null =>
  typeof v === 'string' ? v : v && typeof v === 'object' && 'id' in v ? String((v as { id: string }).id) : null;

// Cancellation (canceled_at, else now) at most 14 days after the start (start_date, else created)
export function annuleeDansFenetre(sub: Sub, nowS: number = Math.floor(Date.now() / 1000)): boolean {
  const debut = sub.start_date ?? sub.created;
  if (typeof debut !== 'number') return false;
  const annulation = sub.canceled_at ?? nowS;
  const ecart = annulation - debut;
  return ecart >= 0 && ecart <= FENETRE_REMBOURSEMENT_JOURS * JOUR_S;
}

export type StatutRemboursement = 'rembourse' | 'aucun_paiement' | 'echec';

// Refunds once; returns the stored outcome, or null when the cancellation is outside the window.
// A network/API outage throws (the webhook answers 500 and Stripe retries); a refusal from Stripe
// (already refunded, disputed…) is stored as 'echec' with its reason, so retries stop.
export async function rembourserAnnulation(sub: Sub, nowS?: number): Promise<StatutRemboursement | null> {
  if (!annuleeDansFenetre(sub, nowS)) return null;
  const supabase = getSupabase();
  const deja = must(await supabase.from('forge_refunds').select('statut').eq('stripe_subscription_id', sub.id).maybeSingle(), 'forge_refunds select');
  if (deja) return deja.statut as StatutRemboursement;

  const customerId = idDe(sub.customer);
  const membre = customerId
    ? must(await supabase.from('forge_members').select('user_id').eq('stripe_customer_id', customerId).maybeSingle(), 'forge_members select')
    : null;
  const ligne = {
    user_id: membre?.user_id ?? null, stripe_customer_id: customerId, stripe_subscription_id: sub.id,
    invoice_id: idDe(sub.latest_invoice), created_at: new Date().toISOString(),
  };
  const enregistrer = async (statut: StatutRemboursement, extra: Record<string, unknown> = {}) => {
    must(await supabase.from('forge_refunds').upsert({ ...ligne, statut, ...extra }, { onConflict: 'stripe_subscription_id' }), 'forge_refunds upsert');
    return statut;
  };

  if (!ligne.invoice_id) return enregistrer('aucun_paiement', { raison: 'Aucune facture sur l’abonnement' });
  const stripe = remboursementDeps.stripe();
  const paiements = await stripe.invoicePayments.list({ invoice: ligne.invoice_id, status: 'paid', limit: 1 });
  const paiement = paiements.data[0]?.payment;
  const paymentIntent = idDe(paiement?.payment_intent);
  const charge = idDe(paiement?.charge);
  if (!paymentIntent && !charge) return enregistrer('aucun_paiement', { raison: 'Aucun paiement encaissé sur la dernière facture' });

  try {
    const refund = await stripe.refunds.create(
      { ...(paymentIntent ? { payment_intent: paymentIntent } : { charge: charge! }), reason: 'requested_by_customer', metadata: { forge_subscription: sub.id, forge_user: ligne.user_id ?? '' } },
      { idempotencyKey: `forge-refund-${sub.id}` },
    );
    return enregistrer('rembourse', { payment_intent_id: paymentIntent, refund_id: refund.id, montant: refund.amount, devise: refund.currency });
  } catch (err) {
    if (err instanceof Stripe.errors.StripeInvalidRequestError) {
      console.error(`[remboursement] Stripe a refusé le remboursement de ${sub.id}:`, err.message);
      return enregistrer('echec', { payment_intent_id: paymentIntent, raison: err.message });
    }
    throw err;
  }
}

// Cancellation "at period end" requested within the window (Stripe customer portal default):
// cancel now, which sends customer.subscription.deleted and triggers the refund. Otherwise the
// subscription would only end after the 14 days and never be refunded.
export async function annulerMaintenantSiDansFenetre(
  sub: Sub & Pick<Stripe.Subscription, 'status'> & Partial<Pick<Stripe.Subscription, 'cancel_at_period_end' | 'cancel_at'>>,
  previous: Partial<Pick<Stripe.Subscription, 'cancel_at_period_end' | 'cancel_at'>> | undefined,
  nowS?: number,
): Promise<boolean> {
  const demandeeMaintenant = (sub.cancel_at_period_end === true && previous?.cancel_at_period_end === false)
    || (typeof sub.cancel_at === 'number' && previous !== undefined && 'cancel_at' in previous && previous.cancel_at == null);
  if (!demandeeMaintenant || sub.status === 'canceled' || !annuleeDansFenetre(sub, nowS)) return false;
  await remboursementDeps.stripe().subscriptions.cancel(sub.id, { prorate: false });
  return true;
}
