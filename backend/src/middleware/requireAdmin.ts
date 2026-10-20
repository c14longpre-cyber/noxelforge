import { Request, Response, NextFunction } from "express";

// Admins are listed by e-mail in FORGE_ADMIN_EMAILS (comma-separated). Use after requireAuth.
export function emailsAdmin(env: Record<string, string | undefined> = process.env): string[] {
  return (env.FORGE_ADMIN_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}

export function estAdmin(email: unknown, env: Record<string, string | undefined> = process.env): boolean {
  return typeof email === "string" && emailsAdmin(env).includes(email.trim().toLowerCase());
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!estAdmin((req as any).user?.email)) {
    res.status(403).json({ ok: false, error: "Réservé aux administrateurs." });
    return;
  }
  next();
}
