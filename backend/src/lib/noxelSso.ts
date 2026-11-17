// NOXEL SSO 1.0 — passage d'une session d'un site NOXEL à l'autre par un lien.
// Fichier identique dans noxelseo, noxelforge et noxelspectra (backend). Logique pure, testée sans réseau.
//
// Le site d'origine (déjà connecté) signe un jeton de 60 secondes, à usage unique, destiné à UN site, et ouvre
// la page voulue de ce site avec ?nxsso=<jeton> ; la page l'envoie aussitôt à SA propre API
// (POST /api/auth/sso/accept), qui le vérifie et ouvre sa session pour le même compte (table users partagée).
// Le cookie est donc posé par l'API que le site utilise déjà, quelle que soit son adresse.
// Secret commun NOXEL_SSO_SECRET (même valeur sur les 3 services). Sans secret : pas de jeton,
// le lien ouvre simplement l'autre site (connexion demandée comme avant).
import crypto from "crypto";

export type SiteNoxel = "seo" | "forge" | "spectra";
export const SITES: readonly SiteNoxel[] = ["seo", "forge", "spectra"];

const FRONTS: Record<SiteNoxel, string> = {
  seo: "https://www.noxelseo.com",
  forge: "https://noxelforge.com",
  spectra: "https://app.noxelspectra.com",
};
export const ACCUEIL: Record<SiteNoxel, string> = { seo: "/app", forge: "/forge/dashboard", spectra: "/" };

/** Adresse publique d'un site (remplaçable par NOXEL_SSO_<SITE>_FRONT pour les essais) */
export function front(site: SiteNoxel, env: Record<string, string | undefined> = process.env): string {
  return (env[`NOXEL_SSO_${site.toUpperCase()}_FRONT`] || FRONTS[site]).replace(/\/+$/, "");
}

/** Page d'arrivée sur l'autre site, avec le jeton en paramètre nxsso (ou sans jeton : simple ouverture) */
export function adresseArrivee(site: SiteNoxel, next: string, jeton: string | null, env: Record<string, string | undefined> = process.env): string {
  const base = front(site, env) + next;
  if (!jeton) return base;
  const [chemin, ancre] = base.split("#");
  return `${chemin}${chemin.includes("?") ? "&" : "?"}nxsso=${encodeURIComponent(jeton)}${ancre !== undefined ? "#" + ancre : ""}`;
}

export function estSite(v: unknown): v is SiteNoxel {
  return typeof v === "string" && (SITES as readonly string[]).includes(v);
}

/** Chemin de retour sûr : commence par « / », jamais « // » ni « /\ », pas de schéma, 300 caractères au plus */
export function cheminSur(next: unknown, defaut = "/"): string {
  const s = typeof next === "string" ? next.trim() : "";
  if (!s || s.length > 300 || !s.startsWith("/") || s.startsWith("//") || s.startsWith("/\\") || /[\r\n]/.test(s)) return defaut;
  return s;
}

export const DUREE_JETON_S = 60;

interface Charge { v: 1; uid: string; email: string; aud: SiteNoxel; iss: SiteNoxel; exp: number; jti: string }

const b64 = (b: Buffer) => b.toString("base64url");
const signe = (secret: string, corps: string) => b64(crypto.createHmac("sha256", secret).update(corps).digest());

export function secretSso(env: Record<string, string | undefined> = process.env): string | null {
  const s = (env.NOXEL_SSO_SECRET || "").trim();
  return s.length >= 32 ? s : null;
}

export function signerPassage(o: { uid: string; email: string; de: SiteNoxel; vers: SiteNoxel }, secret: string, maintenant = Date.now()): string {
  const charge: Charge = { v: 1, uid: o.uid, email: o.email.toLowerCase(), aud: o.vers, iss: o.de, exp: Math.floor(maintenant / 1000) + DUREE_JETON_S, jti: b64(crypto.randomBytes(12)) };
  const corps = b64(Buffer.from(JSON.stringify(charge)));
  return `${corps}.${signe(secret, corps)}`;
}

export type RefusPassage = "format" | "signature" | "expire" | "mauvais_site" | "deja_utilise";

/** Vérifie un jeton pour le site `ici`. Les jti déjà vus sont gardés en mémoire jusqu'à leur expiration. */
export function verifierPassage(jeton: unknown, ici: SiteNoxel, secret: string, vus: Map<string, number>, maintenant = Date.now()):
  { ok: true; uid: string; email: string; de: SiteNoxel } | { ok: false; raison: RefusPassage } {
  if (typeof jeton !== "string" || jeton.length > 1000) return { ok: false, raison: "format" };
  const [corps, sig, reste] = jeton.split(".");
  if (!corps || !sig || reste !== undefined) return { ok: false, raison: "format" };
  const attendu = Buffer.from(signe(secret, corps));
  const recu = Buffer.from(sig);
  if (attendu.length !== recu.length || !crypto.timingSafeEqual(attendu, recu)) return { ok: false, raison: "signature" };
  let c: Charge;
  try { c = JSON.parse(Buffer.from(corps, "base64url").toString("utf8")); } catch { return { ok: false, raison: "format" }; }
  if (c?.v !== 1 || typeof c.uid !== "string" || typeof c.email !== "string" || typeof c.jti !== "string" || !estSite(c.iss)) return { ok: false, raison: "format" };
  if (c.aud !== ici) return { ok: false, raison: "mauvais_site" };
  const s = Math.floor(maintenant / 1000);
  if (typeof c.exp !== "number" || c.exp < s) return { ok: false, raison: "expire" };
  for (const [j, exp] of vus) if (exp < s) vus.delete(j);
  if (vus.has(c.jti)) return { ok: false, raison: "deja_utilise" };
  vus.set(c.jti, c.exp);
  return { ok: true, uid: c.uid, email: c.email, de: c.iss };
}
