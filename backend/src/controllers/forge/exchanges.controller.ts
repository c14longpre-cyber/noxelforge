import { Request, Response } from 'express';
import { proposerEchange, repondreEchange, declarerLien, listerMesEchanges, ErreurEchange } from '../../services/forge/exchanges.service';

// Every route: requireAuth. ErreurEchange carries the HTTP status; anything else goes to the JSON 500 handler.
async function gerer(res: Response, action: () => Promise<unknown>, status = 200) {
  try {
    res.status(status).json({ ok: true, ...(await action() as object) });
  } catch (err) {
    if (err instanceof ErreurEchange) { res.status(err.status).json({ ok: false, error: err.message }); return; }
    throw err;
  }
}

const uid = (req: Request) => (req as any).userId as string;

// GET /api/forge/exchanges
export const listerEchanges = (req: Request, res: Response) => gerer(res, async () => ({ echanges: await listerMesEchanges(uid(req)) }));

// POST /api/forge/exchanges  { partenaire_id }
export const proposer = (req: Request, res: Response) => gerer(res, async () => ({ echange: await proposerEchange(uid(req), req.body?.partenaire_id) }), 201);

// POST /api/forge/exchanges/:id/accepter  |  /refuser
export const accepter = (req: Request, res: Response) => gerer(res, async () => ({ statut: await repondreEchange(uid(req), String(req.params.id), true) }));
export const refuser = (req: Request, res: Response) => gerer(res, async () => ({ statut: await repondreEchange(uid(req), String(req.params.id), false) }));

// POST /api/forge/exchanges/:id/lien  { url }  (page of my own site that links to the partner)
export const declarer = (req: Request, res: Response) => gerer(res, async () => declarerLien(uid(req), String(req.params.id), req.body?.url));
