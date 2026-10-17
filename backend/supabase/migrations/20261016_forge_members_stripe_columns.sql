-- NOXEL Forge — Stripe link on forge_members
-- gererWebhookForge (backend/src/services/forge/stripe.forge.service.ts) writes these two columns;
-- without them the webhook upsert fails and a payment never changes the member's tier.
-- To run manually in the Supabase SQL editor (not applied automatically).

ALTER TABLE forge_members
  ADD COLUMN IF NOT EXISTS stripe_customer_id text,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id text;

CREATE INDEX IF NOT EXISTS forge_members_stripe_customer_id_idx
  ON forge_members (stripe_customer_id);

-- customer.subscription.deleted looks the member up by subscription id
CREATE INDEX IF NOT EXISTS forge_members_stripe_subscription_id_idx
  ON forge_members (stripe_subscription_id);
