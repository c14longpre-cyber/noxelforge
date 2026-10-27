import { Request, Response } from 'express';
import { runSpamGate } from '../../services/forge/spamGate.service';
import { traiterSoumission, determinerFlux, rappelsMembre } from '../../services/forge/alfred.forge.service';
import { getTrustScore } from '../../services/forge/trustScore.service';
import { getSupabase } from '../../lib/supabaseClient';
import { must } from '../../lib/supabaseCheck';
import { normaliserDomaine } from '../../services/forge/trustScorePublic';
export async function creerSoumission(req: Request, res: Response): Promise<void> {
  const supabase = getSupabase();
  const userId = (req as any).userId;
  const { url_soumise, titre, description, contenu, niche } = req.body;
  if (!url_soumise || !titre) { res.status(400).json({ error: 'URL et titre obligatoires.' }); return; }
  const membre = must(await supabase.from('forge_members').select('*').eq('user_id', userId).maybeSingle(), 'forge_members select');
  if (!membre) { res.status(403).json({ error: 'Tu n\'es pas membre de NOXEL Forge.' }); return; }
  // The submitted page must be on the member's own, proven domain (it then appears in the public directory)
  if (!membre.domaine_verifie_at) { res.status(403).json({ error: 'Vérifie d’abord la propriété de ton domaine (tableau de bord).' }); return; }
  const domaineMembre = membre.domaine ?? normaliserDomaine(membre.url_site);
  if (!domaineMembre || normaliserDomaine(url_soumise) !== domaineMembre) { res.status(400).json({ error: `La page soumise doit être sur ton site (${domaineMembre ?? 'domaine du membre'}).` }); return; }
  if (membre.tier_abonnement === 'bronze') { res.status(403).json({ error: 'Bronze = lecture seule. Upgrade vers Silver pour soumettre.' }); return; }
  const spamResult = await runSpamGate({ url: url_soumise, titre, description, contenu, userId, tier: membre.tier_abonnement });
  if (!spamResult.passe) { res.status(400).json({ error: 'Rejeté par Spam Gate.', raison: spamResult.raison, type: spamResult.type }); return; }
  const ageCompteDays = Math.floor((Date.now() - new Date(membre.date_inscription).getTime()) / (1000*60*60*24));
  const flux = determinerFlux({ ageCompteDays, scanComplete: membre.scan_complete, badgeInstalle: membre.badge_installe, tierAbonnement: membre.tier_abonnement });
  if (flux === 'bloque') { res.status(403).json({ error: 'Compte non éligible.', raison: 'Passe à Silver ou plus pour soumettre du contenu.' }); return; }
  const trustScoreData = await getTrustScore(userId);
  const { data: soumission, error: insertError } = await supabase.from('forge_submissions').insert({ user_id: userId, url_soumise, titre, description, niche, flux, statut: 'pending' }).select().single();
  if (insertError || !soumission) { console.error('[creerSoumission] Supabase insert error:', insertError); res.status(500).json({ error: 'Erreur création soumission.' }); return; }
  console.log(`[creerSoumission] Lancement traiterSoumission pour ${soumission.id}`);
  traiterSoumission(soumission.id, { userId, urlSoumise: url_soumise, titre, description, contenu, niche, trustScore: trustScoreData?.score ?? 0, tierForge: membre.tier_abonnement, ageCompteDays, scanComplete: membre.scan_complete, badgeInstalle: membre.badge_installe }).catch((e) => console.error('[creerSoumission] traiterSoumission a rejete:', e));
  res.status(201).json({ ok: true, soumission_id: soumission.id, flux, message: 'Soumission reçue — Alfred analyse ton contenu.', rappels: rappelsMembre(membre) });
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
  const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
  const offset = (pageNum - 1) * limit;
  // Only members whose domain is proven are listed
  const verifies = must(await supabase.from('forge_members').select('user_id').not('domaine_verifie_at', 'is', null), 'forge_members select') ?? [];
  const ids = verifies.map((m: any) => m.user_id);
  if (!ids.length) { res.json({ annuaire: [], page: pageNum, limit }); return; }
  let query = supabase.from('forge_submissions').select('id,url_soumise,titre,description,niche,created_at').in('user_id', ids).in('statut', ['approuve','auto_share']).eq('backlink_noxel_actif', true).order('created_at', { ascending: false }).range(offset, offset+limit-1);
  if (niche) query = query.eq('niche', niche);
  const { data, error } = await query;
  if (error) { res.status(500).json({ error: 'Erreur serveur.' }); return; }
  res.json({ annuaire: data ?? [], page: pageNum, limit });
}

