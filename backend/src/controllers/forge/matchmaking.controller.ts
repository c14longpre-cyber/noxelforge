// ============================================================
// NOXEL Forge™ — Matchmaking Controller
// backend/src/controllers/forge/matchmaking.controller.ts
// ============================================================

import { Request, Response } from 'express';
import { getRecommendedPartners } from '../../services/forge/matchmaking.service';

export async function getSuggestions(req: Request, res: Response): Promise<void> {
  const userId = (req as any).userId;
  const limit = req.query.limit ? Math.min(parseInt(req.query.limit as string), 50) : 20;

  try {
    const suggestions = await getRecommendedPartners(userId, limit);
    res.json({ suggestions, total: suggestions.length });
  } catch (err) {
    console.error('Matchmaking error:', err);
    res.status(500).json({ error: 'Erreur lors du calcul des recommandations.' });
  }
}
