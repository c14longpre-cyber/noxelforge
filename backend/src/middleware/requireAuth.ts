import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token manquant.' });
    return;
  }
  const token = authHeader.replace('Bearer ', '');
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) { res.status(401).json({ error: 'Token invalide ou expiré.' }); return; }
    (req as any).userId = user.id;
    (req as any).user = user;
    next();
  } catch {
    res.status(401).json({ error: 'Erreur authentification.' });
  }
}
