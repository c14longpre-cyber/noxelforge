// NOXEL SSO 1.0 : passage de session entre NOXEL SEO, NOXEL FORGE et NOXEL SPECTRA (lib/noxelSso.ts)
//   GET  /api/auth/sso/go?to=seo|spectra&next=/chemin → ouvre l'autre site avec ?nxsso=<jeton> (ou sans, si pas connecté)
//   POST /api/auth/sso/accept { t }                  → appelé par la page d'arrivée : ouvre la session ici
import { Router, type Request, type Response } from "express";
import { createSession, verifySession } from "../services/session";
import { findUserById } from "../services/userStore";
import { ACCUEIL, adresseArrivee, cheminSur, estSite, secretSso, signerPassage, verifierPassage, type SiteNoxel } from "../lib/noxelSso";

const ICI: SiteNoxel = "forge";
const COOKIE_NAME = process.env.FORGE_SESSION_COOKIE_NAME || "forge_session";
const IS_PROD = process.env.NODE_ENV === "production";
const COOKIE_OPTS = IS_PROD
  ? { httpOnly: true, sameSite: "none" as const, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 }
  : { httpOnly: true, sameSite: "lax" as const, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 };
const vus = new Map<string, number>();

function sessionUserId(req: Request): string | null {
  const s = (req as any).cookies?.[COOKIE_NAME];
  if (!s) return null;
  try { return verifySession(s)?.userId ?? null; } catch { return null; }
}

const router = Router();

router.get("/sso/go", async (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  const to = req.query.to;
  if (!estSite(to) || to === ICI) { res.status(400).json({ ok: false, error: "Site inconnu." }); return; }
  const next = cheminSur(req.query.next, ACCUEIL[to]);
  const secret = secretSso();
  const uid = sessionUserId(req);
  let jeton: string | null = null;
  if (secret && uid) {
    const user = await findUserById(uid).catch(() => null);
    if (user?.email) jeton = signerPassage({ uid: user.id, email: user.email, de: ICI, vers: to }, secret);
  }
  res.redirect(302, adresseArrivee(to, next, jeton));
});

router.post("/sso/accept", async (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  // JSON seulement : un formulaire d'un autre site ne peut pas ouvrir une session ici (pré-vérification CORS)
  if (!req.is("application/json")) { res.status(415).json({ ok: false, error: "json" }); return; }
  const secret = secretSso();
  if (!secret) { res.status(503).json({ ok: false, error: "sso_off" }); return; }
  const r = verifierPassage(req.body?.t, ICI, secret, vus);
  if (!r.ok) {
    if (r.raison !== "expire") console.warn(`[sso] jeton refusé (${r.raison})`);
    res.status(400).json({ ok: false, error: r.raison });
    return;
  }
  const dejaLa = sessionUserId(req);
  // Une session d'un AUTRE compte déjà ouverte ici n'est jamais remplacée par un lien
  if (dejaLa && dejaLa !== r.uid) { res.json({ ok: true, changed: false }); return; }
  const user = await findUserById(r.uid).catch(() => null);
  if (!user || user.email.toLowerCase() !== r.email) { res.status(400).json({ ok: false, error: "compte" }); return; }
  res.cookie(COOKIE_NAME, createSession(user.id), COOKIE_OPTS);
  res.json({ ok: true, changed: true });
});

export default router;
