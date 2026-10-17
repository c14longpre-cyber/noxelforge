// Public, read-only Trust Score for the NOXEL MCP server (tool noxel_trust_score)
import { Router, Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';
import { getTrustScorePublic } from '../../controllers/forge/trustScorePublic.controller';

const router = Router();

// 30/minute per IP (req.ip is the client IP thanks to app.set('trust proxy', 1) in index.ts)
const trustScoreLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-6',
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    const resetTime = (req as any).rateLimit?.resetTime as Date | undefined;
    const retryAfter = Math.max(1, Math.ceil(((resetTime?.getTime() ?? Date.now() + 60_000) - Date.now()) / 1000));
    res.setHeader('Retry-After', String(retryAfter));
    res.status(429).json({ ok: false, error: `Trop de requêtes, réessaie dans ${retryAfter} secondes`, retryAfter });
  },
});

router.get('/:domain', trustScoreLimiter, getTrustScorePublic);

export default router;
