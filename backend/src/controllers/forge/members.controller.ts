import { Request, Response } from 'express';
import { recalculerTrustScore, getTrustScore } from '../../services/forge/trustScore.service';
import { reactiverMembre, verifierBadgeSurSite } from '../../services/forge/badgeChecker.service';
import { determinerFlux } from '../../services/forge/alfred.forge.service';
import { getSupabase } from '../../lib/supabaseClient';
export async function registerMembre(req: Request, res: Response): Promise<void> {
  const supabase = getSupabase();
  const userId = (req as any).userId;
  const { url_site, niche, tier_abonnement = 'bronze' } = req.body;
  const { data: existant, error: checkError } = await supabase.from('forge_members').select('id').eq('user_id', userId).single();
  if (checkError && checkError.code !== 'PGRST116') { console.error('[registerMembre] Check error:', checkError); res.status(500).json({ error: 'Erreur vérification.' }); return; }
  if (existant) { res.status(409).json({ error: 'Tu es déjà membre de NOXEL Forge.' }); return; }
  const { data: membre, error } = await supabase.from('forge_members').insert({ user_id: userId, tier_abonnement, url_site, niche, badge_installe: false, scan_complete: false, statut: 'actif' }).select().single();
  if (error || !membre) { console.error('[registerMembre] Supabase insert error:', error); res.status(500).json({ error: 'Erreur inscription.' }); return; }
  const { error: pointsError } = await supabase.from('forge_points').insert({ user_id: userId, solde: 0, total_gagne: 0, total_depense: 0 });
  if (pointsError) console.error('[registerMembre] Points insert error:', pointsError);
  res.status(201).json({ success: true, membre, message: 'Bienvenue dans NOXEL Forge! 🔥' });
}
export async function getMonStatut(req: Request, res: Response): Promise<void> {
  const supabase = getSupabase();
  const userId = (req as any).userId;
  const [m, t, p, b] = await Promise.all([
    supabase.from('forge_members').select('*').eq('user_id', userId).single(),
    supabase.from('forge_trust_scores').select('*').eq('user_id', userId).single(),
    supabase.from('forge_points').select('*').eq('user_id', userId).single(),
    supabase.from('forge_badges').select('*').eq('user_id', userId).single(),
  ]);
  if (m.error) { console.error('[getMonStatut] Member query error:', m.error); res.status(500).json({ error: 'Erreur récupération. ' }); return; }
  const membre = m.data;
  if (!membre) { res.status(404).json({ error: 'Membre non trouvé.' }); return; }
  const ageCompteDays = Math.floor((Date.now() - new Date(membre.created_at).getTime()) / (1000*60*60*24));
  const flux = determinerFlux({ ageCompteDays, scanComplete: membre.scan_complete, badgeInstalle: membre.badge_installe, tierAbonnement: membre.tier_abonnement });
  const etapesManquantes = [];
  if (!membre.scan_complete) etapesManquantes.push('Lance un scan NOXEL SEO sur ton site');
  if (!membre.badge_installe) etapesManquantes.push('Installe le badge NOXEL sur ton site');
  if (ageCompteDays < 15) etapesManquantes.push(`Compte actif depuis ${15-ageCompteDays} jours de plus`);
  res.json({ membre, trust_score: t.data ?? null, points: p.data ?? { solde: 0 }, badge: b.data ?? null, flux_actuel: flux, age_compte_days: ageCompteDays, etapes_manquantes: flux === 'bloque' ? etapesManquantes : [] });
}
export async function verifierMonBadge(req: Request, res: Response): Promise<void> {
  const supabase = getSupabase();
  const userId = (req as any).userId;
  const { data: membre, error } = await supabase.from('forge_members').select('url_site,statut').eq('user_id', userId).single();
  if (error) { console.error('[verifierMonBadge] Query error:', error); res.status(500).json({ error: 'Erreur vérification.' }); return; }
  if (!membre?.url_site) { res.status(400).json({ error: 'Aucun site associé.' }); return; }
  if (membre.statut === 'suspendu') { const result = await reactiverMembre(userId, membre.url_site); res.json(result); return; }
  const badgePresent = await verifierBadgeSurSite(membre.url_site);
  if (badgePresent) {
    const { error: updateError } = await supabase.from('forge_members').update({ badge_installe: true, updated_at: new Date().toISOString() }).eq('user_id', userId);
    if (updateError) console.error('[verifierMonBadge] Update member error:', updateError);
    const { error: badgeError } = await supabase.from('forge_badges').upsert({ user_id: userId, url_site: membre.url_site, badge_present: true, derniere_verification: new Date().toISOString(), tentatives_echec: 0, statut: 'verifie', updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
    if (badgeError) console.error('[verifierMonBadge] Upsert badge error:', badgeError);
    res.json({ present: true, message: 'Badge NOXEL détecté! Tu peux soumettre du contenu. 🔥' });
  } else {
    res.json({ present: false, message: 'Badge non détecté. Ajoute un lien vers noxelseo.com sur ton site.' });
  }
}
export async function recalculerMonScore(req: Request, res: Response): Promise<void> {
  const supabase = getSupabase();
  const userId = (req as any).userId;
  const { scoresTechnique, domainAuthority, spamScore, qualiteContenu, ageDomaineAnnees, publicationsParMois } = req.body;
  const { data: membre, error } = await supabase.from('forge_members').select('url_site').eq('user_id', userId).single();
  if (error) { console.error('[recalculerMonScore] Query error:', error); res.status(500).json({ error: 'Erreur récupération.' }); return; }
  if (!membre) { res.status(404).json({ error: 'Membre non trouvé.' }); return; }
  const { error: updateError } = await supabase.from('forge_members').update({ scan_complete: true, updated_at: new Date().toISOString() }).eq('user_id', userId);
  if (updateError) console.error('[recalculerMonScore] Update error:', updateError);
  const result = await recalculerTrustScore({ userId, urlSite: membre.url_site, scoresTechnique, domainAuthority, spamScore, qualiteContenu, ageDomaineAnnees, publicationsParMois });
  res.json({ success: true, trust_score: result, message: `Trust Score: ${result.score}/100 — Tier ${result.tier.toUpperCase()} 🔥` });
}
