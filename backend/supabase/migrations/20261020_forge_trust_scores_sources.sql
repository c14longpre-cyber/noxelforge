-- NOXEL Forge — Trust Score computed by the server, signal by signal
-- recalculerTrustScoreServeur (backend/src/services/forge/trustScoreServeur.ts) writes these columns.
-- To run manually in the Supabase SQL editor (not applied automatically), BEFORE deploying the code.

-- Per signal: raw value, source (nse / rdap / sitemap / rss / admin / alfred), collection date,
-- failure reason, and for admin entries the e-mail of the admin (saisi_par).
ALTER TABLE forge_trust_scores
  ADD COLUMN IF NOT EXISTS signaux_sources jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS statut text NOT NULL DEFAULT 'en_attente';

ALTER TABLE forge_trust_scores DROP CONSTRAINT IF EXISTS forge_trust_scores_statut_check;
ALTER TABLE forge_trust_scores
  ADD CONSTRAINT forge_trust_scores_statut_check CHECK (statut IN ('en_attente', 'calcule'));

-- A score waiting for the admin entry has no figure, no tier and no authority/spam points
ALTER TABLE forge_trust_scores
  ALTER COLUMN score DROP NOT NULL,
  ALTER COLUMN tier_forge DROP NOT NULL,
  ALTER COLUMN signal_technique DROP NOT NULL,
  ALTER COLUMN signal_autorite DROP NOT NULL,
  ALTER COLUMN signal_spam DROP NOT NULL,
  ALTER COLUMN signal_contenu DROP NOT NULL,
  ALTER COLUMN signal_anciennete DROP NOT NULL,
  ALTER COLUMN signal_frequence DROP NOT NULL;

-- Rows written before this migration came from values sent by the member: never published as computed
UPDATE forge_trust_scores SET statut = 'en_attente' WHERE signaux_sources = '{}'::jsonb;
