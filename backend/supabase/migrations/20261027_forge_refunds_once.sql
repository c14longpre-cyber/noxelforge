-- 2026-10-27 — The 14-day refund is once per customer: a later subscription cancelled within 14 days
-- is stored as 'deja_rembourse' (nothing refunded). Run once in the Supabase SQL editor.
ALTER TABLE public.forge_refunds DROP CONSTRAINT IF EXISTS forge_refunds_statut_check;
ALTER TABLE public.forge_refunds ADD CONSTRAINT forge_refunds_statut_check
  CHECK (statut IN ('rembourse', 'aucun_paiement', 'echec', 'deja_rembourse'));
CREATE INDEX IF NOT EXISTS forge_refunds_customer_idx ON public.forge_refunds (stripe_customer_id);
