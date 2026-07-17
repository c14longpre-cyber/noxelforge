import { Request, Response, NextFunction } from "express";
import { verifySession } from "../services/session";
import { findUserById } from "../services/userStore";

const COOKIE_NAME = process.env.FORGE_SESSION_COOKIE_NAME || "forge_session";

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const sessionId = (req as any).cookies?.[COOKIE_NAME];
  if (!sessionId) {
    res.status(401).json({ error: "Token manquant." });
    return;
  }
  try {
    const payload = verifySession(sessionId);
    if (!payload) { res.status(401).json({ error: "Token invalide ou expire." }); return; }
    const user = await findUserById(payload.userId);
    if (!user) { res.status(401).json({ error: "Utilisateur introuvable." }); return; }
    (req as any).userId = user.id;
    (req as any).user = user;
    next();
  } catch {
    res.status(401).json({ error: "Erreur authentification." });
  }
}
