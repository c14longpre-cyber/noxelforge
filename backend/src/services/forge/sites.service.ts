// NOXEL FORGE — several sites per account (decision of 2026-11-18).
// The first site of a member stays in forge_members; the others live in forge_sites.
// Each site proves its domain with its own token (jetonDomaine(userId, domaine)), and a proven domain
// belongs to one account only, whichever table holds it.
import { getSupabase } from '../../lib/supabaseClient';
import { must } from '../../lib/supabaseCheck';
import { normaliserDomaine } from './trustScorePublic';
import { instructions, jetonDomaine, verifierPropriete, type DepsPropriete } from './domainOwnership';

/** forge_sites rows; an empty list while the migration has not been run (table missing), so nothing else breaks. */
async function lignesSites(requete: PromiseLike<{ data: any; error: any }>): Promise<any[]> {
  const { data, error } = await requete;
  if (error) {
    const absente = error.code === '42P01' || error.code === 'PGRST205' || /forge_sites/.test(String(error.message ?? '')) && /exist|schema cache/i.test(String(error.message ?? ''));
    if (absente) return [];
    throw new Error(`forge_sites select: ${error.message}`);
  }
  return Array.isArray(data) ? data : [];
}

/** Sites in all per plan, the first site included. Shown on the pricing cards: keep them in sync. */
export const SITES_PAR_FORFAIT: Record<string, number> = { bronze: 1, silver: 1, gold: 3, platinum: 10, diamond: 25 };

export function limiteSites(tier: string | null | undefined): number {
  return SITES_PAR_FORFAIT[String(tier ?? 'bronze').toLowerCase()] ?? 1;
}

export type SiteForge = {
  domaine: string; url_site: string; niche: string | null; principal: boolean;
  verifie: boolean; verifie_at: string | null;
  instructions: ReturnType<typeof instructions> | null;
};

/** True when another account holds this domain, proven, in forge_members or forge_sites. */
export async function domaineProuveParAutre(domaine: string, userId: string): Promise<boolean> {
  const sb = getSupabase();
  const m = must(await sb.from('forge_members').select('user_id').eq('domaine', domaine).not('domaine_verifie_at', 'is', null), 'forge_members select') ?? [];
  if ((m as any[]).some((r) => r.user_id !== userId)) return true;
  const s = await lignesSites(sb.from('forge_sites').select('user_id').eq('domaine', domaine).not('domaine_verifie_at', 'is', null));
  return s.some((r) => r.user_id !== userId);
}

/** The account's sites: the first one (forge_members) then the others, with the proof instructions while unproven. */
export async function listerSites(userId: string): Promise<{ tier: string; limite: number; sites: SiteForge[] } | null> {
  const sb = getSupabase();
  const membre = must(await sb.from('forge_members').select('tier_abonnement,url_site,domaine,niche,domaine_verifie_at').eq('user_id', userId).maybeSingle(), 'forge_members select');
  if (!membre) return null;
  const autres = await lignesSites(sb.from('forge_sites').select('domaine,url_site,niche,domaine_verifie_at,created_at').eq('user_id', userId));
  // Oldest first (sorted here: no order() so that simple query mocks keep working)
  const tries = [...autres].sort((a: any, b: any) => String(a.created_at ?? '').localeCompare(String(b.created_at ?? '')));
  const site = (r: any, principal: boolean): SiteForge => {
    const domaine = r.domaine ?? normaliserDomaine(r.url_site) ?? '';
    return {
      domaine, url_site: r.url_site, niche: r.niche ?? null, principal,
      verifie: !!r.domaine_verifie_at, verifie_at: r.domaine_verifie_at ?? null,
      instructions: r.domaine_verifie_at || !domaine ? null : instructions(domaine, jetonDomaine(userId, domaine)),
    };
  };
  return { tier: membre.tier_abonnement, limite: limiteSites(membre.tier_abonnement), sites: [site(membre, true), ...tries.map((r: any) => site(r, false))] };
}

export type ResultatSite = { ok: true; site: SiteForge } | { ok: false; status: number; error: string };

export async function ajouterSite(userId: string, urlSite: unknown, niche: unknown): Promise<ResultatSite> {
  const domaine = normaliserDomaine(urlSite);
  if (!domaine) return { ok: false, status: 400, error: 'Adresse du site invalide (un nom de domaine est requis).' };
  const etat = await listerSites(userId);
  if (!etat) return { ok: false, status: 403, error: 'Rejoins NOXEL FORGE avant d’ajouter un site.' };
  if (etat.sites.some((s) => s.domaine === domaine)) return { ok: false, status: 409, error: `${domaine} est déjà dans tes sites.` };
  if (etat.sites.length >= etat.limite) {
    return { ok: false, status: 403, error: `Ton forfait permet ${etat.limite} site${etat.limite > 1 ? 's' : ''}. Passe à un forfait supérieur pour en ajouter.` };
  }
  if (await domaineProuveParAutre(domaine, userId)) return { ok: false, status: 409, error: `Le domaine ${domaine} est déjà vérifié par un autre membre.` };
  const url = typeof urlSite === 'string' && /^https?:\/\//i.test(urlSite.trim()) ? urlSite.trim() : `https://${domaine}/`;
  const nicheOk = typeof niche === 'string' ? niche.trim().slice(0, 80) || null : null;
  const { error } = await getSupabase().from('forge_sites').insert({ user_id: userId, domaine, url_site: url, niche: nicheOk });
  if (error) throw new Error(`forge_sites insert: ${error.message}`);
  return { ok: true, site: { domaine, url_site: url, niche: nicheOk, principal: false, verifie: false, verifie_at: null, instructions: instructions(domaine, jetonDomaine(userId, domaine)) } };
}

export async function verifierSite(userId: string, domaineBrut: unknown, deps: DepsPropriete = {}):
  Promise<{ ok: true; verifie: boolean; domaine: string; raison?: string; methode?: string } | { ok: false; status: number; error: string }> {
  const domaine = normaliserDomaine(domaineBrut);
  if (!domaine) return { ok: false, status: 400, error: 'Domaine invalide.' };
  const sb = getSupabase();
  const site = must(await sb.from('forge_sites').select('domaine_verifie_at').eq('user_id', userId).eq('domaine', domaine).maybeSingle(), 'forge_sites select');
  if (!site) return { ok: false, status: 404, error: 'Site introuvable dans ton compte.' };
  if (site.domaine_verifie_at) return { ok: true, verifie: true, domaine };
  if (await domaineProuveParAutre(domaine, userId)) return { ok: false, status: 409, error: `Le domaine ${domaine} est déjà vérifié par un autre membre.` };
  const r = await verifierPropriete(domaine, jetonDomaine(userId, domaine), deps);
  if (!r.ok) return { ok: true, verifie: false, domaine, raison: r.raison };
  const { error } = await sb.from('forge_sites').update({ domaine_verifie_at: new Date().toISOString(), domaine_methode: r.methode }).eq('user_id', userId).eq('domaine', domaine);
  if (error) {
    if ((error as any).code === '23505') return { ok: false, status: 409, error: `Le domaine ${domaine} est déjà vérifié par un autre membre.` };
    throw new Error(`forge_sites update: ${error.message}`);
  }
  return { ok: true, verifie: true, domaine, methode: r.methode };
}

export async function retirerSite(userId: string, domaineBrut: unknown): Promise<{ ok: boolean; status?: number; error?: string }> {
  const domaine = normaliserDomaine(domaineBrut);
  if (!domaine) return { ok: false, status: 400, error: 'Domaine invalide.' };
  const { error } = await getSupabase().from('forge_sites').delete().eq('user_id', userId).eq('domaine', domaine);
  if (error) throw new Error(`forge_sites delete: ${error.message}`);
  return { ok: true };
}

/** Proven domains of the account (first site + other proven sites): a submission must be a page of one of them. */
export async function domainesProuves(userId: string): Promise<string[]> {
  const etat = await listerSites(userId);
  return (etat?.sites ?? []).filter((s) => s.verifie && s.domaine).map((s) => s.domaine);
}
