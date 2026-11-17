// Codes d'accès NOXEL (table access_codes partagée avec NOXEL SEO et NOXEL SPECTRA, colonne product).
// Fichier identique dans noxelforge et noxelspectra : logique pure, testée sans Supabase.
import crypto from "crypto";

export const TIERS = ["bronze", "silver", "gold", "platinum", "diamond"] as const;
export type TierCode = (typeof TIERS)[number];
const RANG: Record<string, number> = { bronze: 0, silver: 1, gold: 2, platinum: 3, diamond: 4 };

export const DUREES = ["1week", "1month", "3months", "6months", "1year", "lifetime"] as const;

export function normaliserTier(t: unknown): TierCode | null {
  const v = String(t ?? "").trim().toLowerCase();
  return (TIERS as readonly string[]).includes(v) ? (v as TierCode) : null;
}

/** Durée du forfait une fois le code échangé, en jours. null = sans fin. */
export function joursAcces(duree: unknown): number | null {
  const d = String(duree ?? "").trim().toLowerCase();
  if (d === "1week" || d === "7days") return 7;
  if (d === "1month" || d === "30days") return 30;
  if (d === "3months") return 90;
  if (d === "6months") return 180;
  if (d === "1year") return 365;
  const m = /^(\d{1,3})days?$/.exec(d);
  if (m) return Math.max(1, Number(m[1]));
  return null;
}

export function finDans(maintenant: Date, jours: number | null): string | null {
  return jours === null ? null : new Date(maintenant.getTime() + jours * 86_400_000).toISOString();
}

/** Préfixe lisible par site : NXF- (FORGE), NXS- (SPECTRA), NXL- (SEO) */
export function nouveauCode(prefixe: string): string {
  const h = () => crypto.randomBytes(3).toString("hex").toUpperCase();
  return `${prefixe}-${h()}-${h()}`;
}

export function normaliserCode(code: unknown): string {
  return String(code ?? "").trim().toUpperCase().slice(0, 40);
}

export interface LigneOffre {
  tier?: string | null;
  tier_expires_at?: string | null;
  tier_after_expiry?: string | null;
}

/** L'offre d'un code est terminée. Un nouvel abonnement Stripe efface l'offre (webhook) : le forfait payé reste. */
export function offreTerminee(r: LigneOffre, maintenant = new Date()): boolean {
  if (!r.tier_expires_at) return false;
  const t = new Date(r.tier_expires_at).getTime();
  return Number.isFinite(t) && t <= maintenant.getTime();
}

/** Forfait réellement en vigueur */
export function tierEffectif(r: LigneOffre, maintenant = new Date()): TierCode {
  const tier = normaliserTier(r.tier) ?? "bronze";
  return offreTerminee(r, maintenant) ? (normaliserTier(r.tier_after_expiry) ?? "bronze") : tier;
}

export type RefusCode = "invalide" | "deja_utilise" | "expire" | "deja_ce_forfait";

/** Vérifie un code avant de l'échanger. Un code ne baisse jamais un compte. */
export function verifierCode(
  code: { product?: string | null; is_used?: boolean | null; expires_at?: string | null; tier?: string | null } | null,
  produit: string,
  tierActuel: string,
  maintenant = new Date(),
): RefusCode | null {
  if (!code || code.product !== produit) return "invalide";
  if (code.is_used) return "deja_utilise";
  if (code.expires_at && new Date(code.expires_at).getTime() < maintenant.getTime()) return "expire";
  const t = normaliserTier(code.tier);
  if (!t || t === "bronze") return "invalide";
  if ((RANG[tierActuel] ?? 0) >= RANG[t]) return "deja_ce_forfait";
  return null;
}

export const MESSAGES_REFUS: Record<RefusCode, string> = {
  invalide: "Code invalide.",
  deja_utilise: "Ce code a déjà été utilisé.",
  expire: "Ce code est expiré.",
  deja_ce_forfait: "Ton forfait est déjà celui-ci ou plus élevé.",
};
