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
    return jwt.verify(token, SECRET) as SessionPayload;
  } catch {
    return null;
  }
}
