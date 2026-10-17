import { Request, Response } from 'express';
import { getSupabase } from '../../lib/supabaseClient';
import { normaliserDomaine, chercherTrustScorePublic } from '../../services/forge/trustScorePublic';

// GET /api/trust-score/:domain — READ ONLY: returns the last stored score, never triggers a computation.
// Only for active Forge members whose badge is verified ("public"): the score of a member
// without a public badge never leaves the API.
export async function getTrustScorePublic(req: Request, res: Response): Promise<void> {
  const domain = normaliserDomaine(req.params.domain);
  if (!domain) { res.status(400).json({ ok: false, error: 'Domaine invalide.' }); return; }
  try {
    res.json(await chercherTrustScorePublic(getSupabase() as any, domain));
  } catch (err: any) {
    console.error('[getTrustScorePublic]', err?.message ?? err);
    res.status(500).json({ ok: false, error: 'Erreur serveur.' });
  }
}
