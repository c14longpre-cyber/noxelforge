import { Request, Response } from 'express';
import { ErreurCode, creerCodes, echangerCode, listerCodes } from '../../services/forge/codesAcces.service';

function erreur(res: Response, e: unknown) {
  if (e instanceof ErreurCode) { res.status(e.status).json({ ok: false, error: e.message }); return; }
  console.error('[codes]', e);
  res.status(500).json({ ok: false, error: 'Erreur serveur.' });
}

export async function adminCreerCodes(req: Request, res: Response) {
  try {
    const b = req.body ?? {};
    const codes = await creerCodes({ tier: b.tier, duree: b.duration, nombre: b.count, note: b.note, par: String((req as any).user?.email ?? 'admin') });
    res.json({ ok: true, codes });
  } catch (e) { erreur(res, e); }
}

export async function adminListerCodes(_req: Request, res: Response) {
  try { res.json({ ok: true, codes: await listerCodes() }); } catch (e) { erreur(res, e); }
}

export async function echanger(req: Request, res: Response) {
  try {
    const r = await echangerCode((req as any).userId, String((req as any).user?.email ?? ''), req.body?.code);
    res.json({ ok: true, tier: r.tier, expiresAt: r.finAt });
  } catch (e) { erreur(res, e); }
}
