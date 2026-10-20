import { Request, Response } from 'express';
import { enregistrerSaisieAdmin, ErreurSaisieAdmin, listerMembresAdmin, recalculerTrustScoreServeur } from '../../services/forge/trustScoreServeur';

// POST /api/forge/admin/trust-score/:userId  { domainAuthority?, spamScore? }  (requireAuth + requireAdmin)
export async function saisirSignauxAdmin(req: Request, res: Response): Promise<void> {
  const { domainAuthority, spamScore } = req.body ?? {};
  try {
    const resultat = await enregistrerSaisieAdmin(String(req.params.userId), { domainAuthority, spamScore }, (req as any).user.email);
    if (!resultat) { res.status(404).json({ ok: false, error: 'Membre non trouvé.' }); return; }
    res.json({ ok: true, trust_score: resultat });
  } catch (err) {
    if (err instanceof ErreurSaisieAdmin) { res.status(400).json({ ok: false, error: err.message }); return; }
    throw err;
  }
}

// GET /api/forge/admin/trust-scores  (requireAuth + requireAdmin)
export async function listerTrustScoresAdmin(_req: Request, res: Response): Promise<void> {
  res.json({ ok: true, membres: await listerMembresAdmin() });
}

// POST /api/forge/admin/trust-score/:userId/recalculate  (requireAuth + requireAdmin; no member cooldown)
export async function recalculerTrustScoreAdmin(req: Request, res: Response): Promise<void> {
  const resultat = await recalculerTrustScoreServeur(String(req.params.userId));
  if (!resultat) { res.status(404).json({ ok: false, error: 'Membre non trouvé.' }); return; }
  res.json({ ok: true, trust_score: resultat });
}
