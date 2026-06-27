import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import { runSpamGate } from '../../services/forge/spamGate.service';
import { traiterSoumission, determinerFlux } from '../../services/forge/alfred.forge.service';
import { getTrustScore } from '../../services/forge/trustScore.service';
function getSupabase() { return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!); }
export async function creerSoumission(req: Request, res: Response): Promise<void> {
  const supabase = getSupabase();
  const userId = (req as any).userId;
  const { url_soumise, titre, description, contenu, niche } = req.body;
  if (!url_soumise || !titre) { res.status(400).json({ error: 'URL et titre obligatoires.' }); return; }
  const { data: membre } = await supabase.from('forge_members').select('*').eq('user_id', userId).single();
  if (!membre) { res.status(403).json({ error: 'Tu n\'es pas membre de NOXEL Forge.' }); return; }
  if (membre.tier_abonnement === 'bronze') { res.status(403).json({ error: 'Bronze = lecture seule. Upgrade vers Silver pour soumettre.' }); return; }
  const spamResult = await runSpamGate({ url: url_soumise, titre, description, contenu, userId });
  if (!spamResult.passe) { res.status(400).json({ error: 'Rejeté par Spam Gate.', raison: spamResult.raison, type: spamResult.type }); return; }
  const ageCompteDays = Math.floor((Date.now() - new Date(membre.date_inscription).getTime()) / (1000*60*60*24));
  const flux = determinerFlux({ ageCompteDays, scanComplete: membre.scan_complete, badgeInstalle: membre.badge_installe, tierAbonnement: membre.tier_abonnement });
  if (flux === 'bloque') { res.status(403).json({ error: 'Compte non éligible.', raison: !membre.scan_complete ? 'Lance un scan NOXEL SEO d\'abord.' : 'Installe le badge NOXEL sur ton site.' }); return; }
  const trustScoreData = await getTrustScore(userId);
  const { data: soumission, error: insertError } = await supabase.from('forge_submissions').insert({ user_id: userId, url_soumise, titre, description, niche, flux, statut: 'pending' }).select().single();
  if (insertError || !soumission) { res.status(500).json({ error: 'Erreur création soumission.' }); return; }
  traiterSoumission(soumission.id, { userId, urlSoumise: url_soumise, titre, description, contenu, niche, trustScore: trustScoreData?.score ?? 0, tierForge: trustScoreData?.tier ?? 'bronze', ageCompteDays, scanComplete: membre.scan_complete, badgeInstalle: membre.badge_installe }).catch(console.error);
  res.status(201).json({ success: true, soumission_id: soumission.id, flux, message: flux === 'auto_share' ? 'Publié automatiquement. Bienvenue dans NOXEL Forge! 🔥' : 'Soumission reçue — Alfred analyse ton contenu.' });
}
export async function getMesSoumissions(req: Request, res: Response): Promise<void> {
  const supabase = getSupabase();
  const userId = (req as any).userId;
  const { data, error } = await supabase.from('forge_submissions').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  if (error) { res.status(500).json({ error: 'Erreur serveur.' }); return; }
  res.json({ soumissions: data ?? [] });
}
export async function getAnnuaire(req: Request, res: Response): Promise<void> {
  const supabase = getSupabase();
  const { niche, page = '1' } = req.query;
  const limit = 20;
  const offset = (parseInt(page as string) - 1) * limit;
  let query = supabase.from('forge_submissions').select('id,url_soumise,titre,description,niche,created_at').in('statut', ['approuve','auto_share']).eq('backlink_noxel_actif', true).order('created_at', { ascending: false }).range(offset, offset+limit-1);
  if (niche) query = query.eq('niche', niche);
  const { data, error } = await query;
  if (error) { res.status(500).json({ error: 'Erreur serveur.' }); return; }
  res.json({ annuaire: data ?? [], page: parseInt(page as string), limit });
}
