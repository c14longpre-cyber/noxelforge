-- NOXEL Forge — backlink exchanges (backend/src/services/forge/exchanges.service.ts)
-- propose -> accepte -> publie -> verifie ; terminal: refuse, expire, rompu.
-- To run manually in the Supabase SQL editor (not applied automatically), BEFORE deploying the code.

CREATE TABLE IF NOT EXISTS forge_exchanges (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  membre_a        text NOT NULL,            -- member who proposed (forge_members.user_id)
  membre_b        text NOT NULL,            -- invited member
  statut          text NOT NULL DEFAULT 'propose'
                  CHECK (statut IN ('propose', 'accepte', 'publie', 'verifie', 'refuse', 'expire', 'rompu')),
  url_a           text,                     -- page of A's site linking to B
  url_b           text,                     -- page of B's site linking to A
  verifie_a       boolean NOT NULL DEFAULT false,
  verifie_b       boolean NOT NULL DEFAULT false,
  propose_at      timestamptz NOT NULL DEFAULT now(),
  accepte_at      timestamptz,
  verifie_at      timestamptz,
  termine_at      timestamptz,              -- refuse / expire / rompu
  grace_expire_at timestamptz,              -- verified exchange with a missing link: 'rompu' after this date
  raison          text,
  CHECK (membre_a <> membre_b)
);

CREATE INDEX IF NOT EXISTS forge_exchanges_membre_a_idx ON forge_exchanges (membre_a);
CREATE INDEX IF NOT EXISTS forge_exchanges_membre_b_idx ON forge_exchanges (membre_b);
CREATE INDEX IF NOT EXISTS forge_exchanges_statut_idx ON forge_exchanges (statut);

-- At most one exchange in progress or verified per pair of members, whoever proposed it
CREATE UNIQUE INDEX IF NOT EXISTS forge_exchanges_paire_active_idx
  ON forge_exchanges (LEAST(membre_a, membre_b), GREATEST(membre_a, membre_b))
  WHERE statut IN ('propose', 'accepte', 'publie', 'verifie');
