-- NOXEL FORGE — several sites per account (decision of 2026-11-18).
-- The member's first site stays in forge_members (domaine, url_site, domaine_verifie_at): nothing changes for it.
-- The other sites of the account go here. Limit per plan (sites in all, first site included):
-- Bronze 1, Silver 1, Gold 3, Platinum 10, Diamond 25 (backend/src/services/forge/sites.service.ts).
-- To run by hand in the Supabase SQL editor.

CREATE TABLE IF NOT EXISTS forge_sites (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            text NOT NULL,          -- forge_members.user_id
  domaine            text NOT NULL,          -- normalised host, without www
  url_site           text NOT NULL,
  niche              text,
  domaine_verifie_at timestamptz,
  domaine_methode    text,                   -- meta | fichier | dns
  created_at         timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, domaine)
);

CREATE INDEX IF NOT EXISTS forge_sites_user_idx ON forge_sites (user_id);
-- One account at most can hold a proven domain (same rule as forge_members.domaine)
CREATE UNIQUE INDEX IF NOT EXISTS forge_sites_domaine_verifie_idx ON forge_sites (domaine) WHERE domaine_verifie_at IS NOT NULL;
