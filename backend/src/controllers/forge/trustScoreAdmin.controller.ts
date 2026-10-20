import { Request, Response } from 'express';
import { enregistrerSaisieAdmin, ErreurSaisieAdmin } from '../../services/forge/trustScoreServeur';

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
