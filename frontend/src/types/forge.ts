// Shapes of the Forge API answers read by the pages (backend: backend/src/controllers/forge/*).
// Only the fields the pages use are listed; the API may send more.

export interface TrustScoreRow {
  statut?: 'en_attente' | 'calcule';
  score: number | null;
  tier_forge: string | null;
  signal_technique: number | null;
  signal_autorite: number | null;
  signal_spam: number | null;
  signal_contenu: number | null;
  signal_anciennete: number | null;
  signal_frequence: number | null;
}

export interface PointsHistoryEntry {
  type: 'earn' | 'spend' | string;
  points: number;
  description: string;
  date: string;
}

export interface ForgePoints {
  solde: number;
  total_gagne?: number;
  total_depense?: number;
  historique?: PointsHistoryEntry[];
}

export interface MemberStatus {
  membre: { tier_abonnement: string; url_site?: string | null; niche?: string | null; statut?: string };
  est_admin?: boolean;
  trust_score: TrustScoreRow | null;
  points: ForgePoints;
  badge: { statut?: string } | null;
  flux_actuel: 'alfred' | 'auto_share' | 'bloque' | string;
  age_compte_days: number;
  etapes_manquantes: string[];
  rappels?: string[];
  domaine_verification?: {
    domaine: string;
    verifie: boolean;
    verifie_at: string | null;
    jeton: string;
    instructions: { meta: string; fichier: { url: string; contenu: string }; dns: { nom: string; valeur: string } };
  } | null;
}

export interface Soumission {
  id: string;
  url_soumise: string;
  titre: string;
  statut: string;
  description?: string | null;
  niche?: string | null;
  created_at?: string;
}

export interface AnnuaireItem {
  id: string;
  url_soumise: string;
  titre: string;
  description?: string | null;
  niche?: string | null;
  created_at: string;
}

export interface PartnerSuggestion {
  user_id: string;
  url_site: string;
  niche: string | null;
  trust_score: number | null;
  trust_tier: string | null;
  score_matchmaking: number;
  raison: string;
}

export interface PartnerSubmission extends AnnuaireItem {
  forge_trust_scores?: { score: number | null; tier_forge: string | null } | null;
}

export interface SubmitResult {
  soumission_id?: string;
  flux?: string;
  message?: string;
  rappels?: string[];
}

// Public user fields sent by /api/auth/* (never the password hash nor provider_id)
export interface PublicUser {
  id?: string;
  email?: string;
  name?: string;
  avatarUrl?: string | null;
  provider?: string;
  tier?: string;
}

// GET /api/forge/exchanges
export type ExchangeStatus = 'propose' | 'accepte' | 'publie' | 'verifie' | 'refuse' | 'expire' | 'rompu';
export interface Exchange {
  id: string;
  statut: ExchangeStatus;
  role: 'propose_par_moi' | 'recu';
  partenaire: { user_id: string; url_site: string | null; niche: string | null };
  mon_lien: { url: string | null; verifie: boolean };
  son_lien: { url: string | null; verifie: boolean };
  propose_at: string;
  accepte_at: string | null;
  verifie_at: string | null;
  termine_at: string | null;
  grace_expire_at: string | null;
  raison: string | null;
}
