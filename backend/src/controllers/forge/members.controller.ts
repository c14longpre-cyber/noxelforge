import { Request, Response } from 'express';
import * as trustScoreServeur from '../../services/forge/trustScoreServeur';
import { estAdmin } from '../../middleware/requireAdmin';
import { reactiverMembre, verifierBadgeSurSite } from '../../services/forge/badgeChecker.service';
import { determinerFlux } from '../../services/forge/alfred.forge.service';
import { getSupabase } from '../../lib/supabaseClient';
import { must } from '../../lib/supabaseCheck';
export async function registerMembre(req: Request, res: Response): Promise<void> {
  const supabase = getSupabase();
  const userId = (req as any).userId;
  // tier_abonnement sent by the client is ignored: every new account starts on the free tier,
  // only the Stripe webhook (gererWebhookForge) changes it after a real payment
  const { url_site, niche } = req.body;
  const tier_abonnement = 'bronze';
  const existant = must(await supabase.from('forge_members').select('id').eq('user_id', userId).maybeSingle(), 'forge_members select');
  if (existant) { res.status(409).json({ error: 'Tu es déjà membre de NOXEL Forge.' }); return; }
  const { data: membre, error } = await supabase.from('forge_members').insert({ user_id: userId, tier_abonnement, url_site, niche, badge_installe: false, scan_complete: false, statut: 'actif' }).select().single();
  if (error || !membre) { console.error('[registerMembre] Supabase insert error:', error); res.status(500).json({ error: 'Erreur inscription.' }); return; }
  // The member is already created: a points failure is logged, not turned into a 500 (a retry would get 409)
  const { error: pointsError } = await supabase.from('forge_points').insert({ user_id: userId, solde: 0, total_gagne: 0, total_depense: 0 });
  if (pointsError) console.error('[registerMembre] Points insert error:', pointsError);
  res.status(201).json({ success: true, membre, message: 'Bienvenue dans NOXEL Forge! 🔥' });
}
export async function getMonStatut(req: Request, res: Response): Promise<void> {
  const supabase = getSupabase();
  const userId = (req as any).userId;
  const [m, t, p, b] = await Promise.all([
    supabase.from('forge_members').select('*').eq('user_id', userId).maybeSingle(),
    supabase.from('forge_trust_scores').select('*').eq('user_id', userId).maybeSingle(),
    supabase.from('forge_points').select('*').eq('user_id', userId).maybeSingle(),
    supabase.from('forge_badges').select('*').eq('user_id', userId).maybeSingle(),
  ]);
  must(m, 'forge_members select'); must(t, 'forge_trust_scores select');
  must(p, 'forge_points select'); must(b, 'forge_badges select');
  const membre = m.data;
  if (!membre) { res.status(404).json({ error: 'Membre non trouvé.' }); return; }
  const ageCompteDays = Math.floor((Date.now() - new Date(membre.date_inscription).getTime()) / (1000*60*60*24));
  const flux = determinerFlux({ ageCompteDays, scanComplete: membre.scan_complete, badgeInstalle: membre.badge_installe, tierAbonnement: membre.tier_abonnement });
  const etapesManquantes = [];
  if (!membre.scan_complete) etapesManquantes.push('Lance un scan NOXEL SEO sur ton site');
  if (!membre.badge_installe) etapesManquantes.push('Installe le badge NOXEL sur ton site');
  if (ageCompteDays < 15) etapesManquantes.push(`Compte actif depuis ${15-ageCompteDays} jours de plus`);
  res.json({ membre, est_admin: estAdmin((req as any).user?.email), trust_score: t.data ?? null, points: p.data ?? { solde: 0 }, badge: b.data ?? null, flux_actuel: flux, age_compte_days: ageCompteDays, etapes_manquantes: flux === 'bloque' ? etapesManquantes : [] });
}
export async function verifierMonBadge(req: Request, res: Response): Promise<void> {
  const supabase = getSupabase();
  const userId = (req as any).userId;
  const membre = must(await supabase.from('forge_members').select('url_site,statut').eq('user_id', userId).maybeSingle(), 'forge_members select');
  if (!membre?.url_site) { res.status(400).json({ error: 'Aucun site associé.' }); return; }
  if (membre.statut === 'suspendu') { const result = await reactiverMembre(userId, membre.url_site); res.json(result); return; }
  const badgePresent = await verifierBadgeSurSite(membre.url_site);
  if (badgePresent) {
    must(await supabase.from('forge_members').update({ badge_installe: true, updated_at: new Date().toISOString() }).eq('user_id', userId), 'forge_members update');
    must(await supabase.from('forge_badges').upsert({ user_id: userId, url_site: membre.url_site, badge_present: true, derniere_verification: new Date().toISOString(), tentatives_echec: 0, statut: 'verifie', updated_at: new Date().toISOString() }, { onConflict: 'user_id' }), 'forge_badges upsert');
    res.json({ present: true, message: 'Badge NOXEL détecté! Tu peux soumettre du contenu. 🔥' });
  } else {
    res.json({ present: false, message: 'Badge non détecté. Ajoute un lien vers noxelseo.com sur ton site.' });
  }
}
// The body is ignored: every signal comes from a server source (see trustScoreServeur.ts)
export async function recalculerMonScore(req: Request, res: Response): Promise<void> {
  const userId = (req as any).userId;
  const attente = await trustScoreServeur.minutesAvantRecalcul(userId);
  if (attente > 0) { res.status(429).json({ ok: false, error: `Trust Score déjà recalculé récemment. Réessaie dans ${attente} min.` }); return; }
  const resultat = await trustScoreServeur.recalculerTrustScoreServeur(userId);
  if (!resultat) { res.status(404).json({ ok: false, error: 'Membre non trouvé.' }); return; }
  res.json({ ok: true, trust_score: resultat });
}
