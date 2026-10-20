-- NOXEL Forge — automatic 14-day refunds (backend/src/services/forge/remboursement.service.ts)
-- One row per cancelled subscription: the unique stripe_subscription_id is what stops a second refund.
-- To run manually in the Supabase SQL editor (not applied automatically), BEFORE deploying the code.

CREATE TABLE IF NOT EXISTS forge_refunds (
  id                     uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                text,
  stripe_customer_id     text,
  stripe_subscription_id text NOT NULL UNIQUE,
  invoice_id             text,
  payment_intent_id      text,
  refund_id              text,
  montant                integer,          -- cents, as Stripe returns it
  devise                 text,
  statut                 text NOT NULL CHECK (statut IN ('rembourse', 'aucun_paiement', 'echec')),
  raison                 text,             -- why nothing was refunded ('aucun_paiement', 'echec')
  created_at             timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS forge_refunds_user_id_idx ON forge_refunds (user_id);
