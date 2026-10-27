-- 2026-10-27 — Proof of domain ownership (audit): a member's domain is public only once proven,
-- and only one member can hold a proven domain. Run once in the Supabase SQL editor.
ALTER TABLE public.forge_members
  ADD COLUMN IF NOT EXISTS domaine text,
  ADD COLUMN IF NOT EXISTS domaine_verifie_at timestamptz,
  ADD COLUMN IF NOT EXISTS domaine_methode text;

-- Normalized domain of the existing members (the app fills it for new ones): no scheme, no www, no path
UPDATE public.forge_members
SET domaine = lower(split_part(regexp_replace(url_site, '^[a-zA-Z]+://(www\.)?', ''), '/', 1))
WHERE domaine IS NULL AND url_site IS NOT NULL;

-- One member per proven domain
CREATE UNIQUE INDEX IF NOT EXISTS forge_members_domaine_verifie_unique
  ON public.forge_members (domaine) WHERE domaine_verifie_at IS NOT NULL;
