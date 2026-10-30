// Rate limits of the sign-in routes (req.ip is the client: app.set("trust proxy", 1) in index.ts).
// Without them, passwords could be tried without limit and sign-in e-mails sent to any address in a loop.
import type { Request, Response } from "express";
import { rateLimit, ipKeyGenerator } from "express-rate-limit";

const message = (req: Request, res: Response) => {
  const resetTime = (req as any).rateLimit?.resetTime as Date | undefined;
  const retryAfter = Math.max(1, Math.ceil(((resetTime?.getTime() ?? Date.now() + 60_000) - Date.now()) / 1000));
  res.setHeader("Retry-After", String(retryAfter));
  res.status(429).json({ ok: false, code: "rate_limited", error: `Too many attempts. Try again in ${Math.ceil(retryAfter / 60)} min.`, retryAfter });
};

// Password sign-in / sign-up, passkey ceremonies: 20 per 15 minutes per address
export const authLimiter = rateLimit({ windowMs: 15 * 60_000, limit: 20, standardHeaders: "draft-6", legacyHeaders: false, handler: message });

// E-mails sent (magic link, sign-up confirmation): 5 per hour per address AND per recipient
export const emailIpLimiter = rateLimit({ windowMs: 60 * 60_000, limit: 5, standardHeaders: "draft-6", legacyHeaders: false, handler: message });
export const emailRecipientLimiter = rateLimit({
  windowMs: 60 * 60_000, limit: 5, standardHeaders: false, legacyHeaders: false, handler: message,
  keyGenerator: (req: Request) => {
    const email = String((req.body as any)?.email ?? "").trim().toLowerCase();
    return email ? `mail:${email}` : `ip:${ipKeyGenerator(req.ip ?? "")}`;
  },
});
