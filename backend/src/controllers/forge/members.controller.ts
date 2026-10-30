import { Request, Response } from 'express';
import * as trustScoreServeur from '../../services/forge/trustScoreServeur';
import { estAdmin } from '../../middleware/requireAdmin';
import { reactiverMembre, verifierBadgeSurSite } from '../../services/forge/badgeChecker.service';
import { determinerFlux, rappelsMembre } from '../../services/forge/alfred.forge.service';
import { getSupabase } from '../../lib/supabaseClient';
import { must } from '../../lib/supabaseCheck';
import { normaliserDomaine } from '../../services/forge/trustScorePublic';
import { jetonDomaine, instructions, verifierPropriete } from '../../services/forge/domainOwnership';

// Another member already proved this domain
async function domainePrisParAutre(domaine: string, userId: string): Promise<boolean> {
  const rows = must(await getSupabase().from('forge_members').select('user_id').eq('domaine', domaine).not('domaine_verifie_at', 'is', null), 'forge_members select') ?? [];
  return rows.some((r: any) => r.user_id !== userId);
}
export async function registerMembre(req: Request, res: Response): Promise<void> {
  const supabase = getSupabase();
  const userId = (req as any).userId;
  // tier_abonnement sent by the client is ignored: every new account starts on the free tier,
  // only the Stripe webhook (gererWebhookForge) changes it after a real payment
  const { url_site, niche } = req.body;
  const tier_abonnement = 'bronze';
  // The site must be a real domain name; it becomes public only once its ownership is proven
  const domaine = normaliserDomaine(url_site);
  if (!domaine) { res.status(400).json({ error: 'Adresse du site invalide (un nom de domaine est requis).' }); return; }
  if (await domainePrisParAutre(domaine, userId)) { res.status(409).json({ error: `Le domaine ${domaine} est déjà vérifié par un autre membre.` }); return; }
  const existant = must(await supabase.from('forge_members').select('id').eq('user_id', userId).maybeSingle(), 'forge_members select');
  if (existant) { res.status(409).json({ error: 'Tu es déjà membre de NOXEL Forge.' }); return; }
  const { data: membre, error } = await supabase.from('forge_members').insert({ user_id: userId, tier_abonnement, url_site, domaine, niche, badge_installe: false, scan_complete: false, statut: 'actif' }).select().single();
  if (error || !membre) { console.error('[registerMembre] Supabase insert error:', error); res.status(500).json({ error: 'Erreur inscription.' }); return; }
  // The member is already created: a points failure is logged, not turned into a 500 (a retry would get 409)
  const { error: pointsError } = await supabase.from('forge_points').insert({ user_id: userId, solde: 0, total_gagne: 0, total_depense: 0 });
  if (pointsError) console.error('[registerMembre] Points insert error:', pointsError);
  res.status(201).json({ ok: true, membre, message: 'Bienvenue dans NOXEL Forge! 🔥' });
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
  // determinerFlux only blocks the free tier: list the step actually enforced, not scan/badge/age
  const etapesManquantes = ['Passe à Silver ou plus pour soumettre du contenu'];
  const domaine = membre.domaine ?? normaliserDomaine(membre.url_site);
  const domaineVerifie = !!membre.domaine_verifie_at;
  const etapes = flux === 'bloque' ? [...etapesManquantes] : [];
  if (!domaineVerifie) etapes.unshift('Prouve que tu possèdes ton site (domaine) pour apparaître dans Forge');
  res.json({ membre, domaine_verification: domaine ? { domaine, verifie: domaineVerifie, verifie_at: membre.domaine_verifie_at ?? null, jeton: jetonDomaine(userId, domaine), instructions: instructions(domaine, jetonDomaine(userId, domaine)) } : null, est_admin: estAdmin((req as any).user?.email), trust_score: t.data ?? null, points: p.data ?? { solde: 0 }, badge: b.data ?? null, flux_actuel: flux, age_compte_days: ageCompteDays, etapes_manquantes: etapes, rappels: rappelsMembre(membre) });
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
  // Signals (NOXEL SEO scan, Alfred…) are only collected for a domain the member has proven
  const m = must(await getSupabase().from('forge_members').select('domaine_verifie_at').eq('user_id', userId).maybeSingle(), 'forge_members select');
  if (m && !m.domaine_verifie_at) { res.status(403).json({ ok: false, error: 'Vérifie d’abord la propriété de ton domaine.' }); return; }
  const attente = await trustScoreServeur.minutesAvantRecalcul(userId);
  if (attente > 0) { res.status(429).json({ ok: false, error: `Trust Score déjà recalculé récemment. Réessaie dans ${attente} min.` }); return; }
  const resultat = await trustScoreServeur.recalculerTrustScoreServeur(userId);
  if (!resultat) { res.status(404).json({ ok: false, error: 'Membre non trouvé.' }); return; }
  res.json({ ok: true, trust_score: resultat });
}

// POST /api/forge/members/domain/verify — checks the meta tag, the .well-known file or the DNS TXT record
export async function verifierMonDomaine(req: Request, res: Response): Promise<void> {
  const supabase = getSupabase();
  const userId = (req as any).userId;
  const membre = must(await supabase.from('forge_members').select('url_site,domaine,domaine_verifie_at').eq('user_id', userId).maybeSingle(), 'forge_members select');
  if (!membre) { res.status(404).json({ ok: false, error: 'Membre non trouvé.' }); return; }
  const domaine = membre.domaine ?? normaliserDomaine(membre.url_site);
  if (!domaine) { res.status(400).json({ ok: false, error: 'Adresse du site invalide.' }); return; }
  if (membre.domaine_verifie_at) { res.json({ ok: true, verifie: true, domaine }); return; }
  if (await domainePrisParAutre(domaine, userId)) { res.status(409).json({ ok: false, error: `Le domaine ${domaine} est déjà vérifié par un autre membre.` }); return; }

  const r = await verifierPropriete(domaine, jetonDomaine(userId, domaine));
  if (!r.ok) { res.json({ ok: true, verifie: false, domaine, raison: r.raison }); return; }
  const { error } = await supabase.from('forge_members')
    .update({ domaine, domaine_verifie_at: new Date().toISOString(), domaine_methode: r.methode, updated_at: new Date().toISOString() })
    .eq('user_id', userId);
  if (error) {
    // Unique index: someone else proved the same domain at the same moment
    if ((error as any).code === '23505') { res.status(409).json({ ok: false, error: `Le domaine ${domaine} est déjà vérifié par un autre membre.` }); return; }
    throw new Error(`forge_members update: ${error.message}`);
  }
  res.json({ ok: true, verifie: true, domaine, methode: r.methode });
}
