import jwt from "jsonwebtoken";

const SECRET = process.env.FORGE_JWT_SECRET as string;
if (!SECRET) {
  throw new Error("FORGE_JWT_SECRET is not set — refusing to start without a real secret.");
}

const EXPIRES_IN = "7d";

export type SessionPayload = {
  userId: string;
  iat?: number;
  exp?: number;
};

export function createSession(userId: string): string {
  return jwt.sign({ userId }, SECRET, { expiresIn: EXPIRES_IN });
}

export function verifySession(token: string): SessionPayload | null {
  try {
    const p = jwt.verify(token, SECRET) as SessionPayload & { purpose?: string };
    // A confirmation token (signerJeton) is never a session
    if (!p || p.purpose || typeof p.userId !== "string") return null;
    return p;
  } catch {
    return null;
  }
}

// Signed, single-purpose tokens (e-mail confirmation of a sign-up): nothing to store, expire on their own.
// The purpose is checked so a session token can never be used as a confirmation token, and vice versa.
export function signerJeton(payload: Record<string, unknown>, purpose: string, expiresIn: string): string {
  return jwt.sign({ ...payload, purpose }, SECRET, { expiresIn } as jwt.SignOptions);
}

export function verifierJeton<T = Record<string, unknown>>(token: string, purpose: string): (T & { purpose: string }) | null {
  try {
    const p = jwt.verify(token, SECRET) as any;
    return p && p.purpose === purpose ? p : null;
  } catch {
    return null;
  }
}
