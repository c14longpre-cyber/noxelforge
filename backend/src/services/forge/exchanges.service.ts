// Backlink exchanges between two members (decision of 2026-10-20):
//   propose -> accepte -> publie (one or both sides declared online) -> verifie (both links verified)
//   terminal: refuse, expire (14 days to accept, 60 days to publish and verify), rompu (a verified
//   link stayed missing after a 7-day grace). Only 'verifie' is a completed exchange; no Forge Points.
// The server checks each link itself: the declared page must be on the member's own domain and
// contain a link to the partner's domain.
import { getSupabase } from '../../lib/supabaseClient';
import { must } from '../../lib/supabaseCheck';
import { normaliserDomaine } from './trustScorePublic';
import { recupererTexte } from './signals/http';
import type { FetchFn } from './signals/types';

export type StatutEchange = 'propose' | 'accepte' | 'publie' | 'verifie' | 'refuse' | 'expire' | 'rompu';
export const STATUTS_ACTIFS: StatutEchange[] = ['propose', 'accepte', 'publie', 'verifie'];

const JOUR_MS = 24 * 60 * 60 * 1000;
export const DELAI_ACCEPTATION_JOURS = 14;
export const DELAI_VERIFICATION_JOURS = 60;
export const GRACE_LIEN_JOURS = 7;

export interface Echange {
  id: string;
  membre_a: string; // proposer
  membre_b: string;
  statut: StatutEchange;
  url_a: string | null; // page on A's site linking to B
  url_b: string | null;
  verifie_a: boolean;
  verifie_b: boolean;
  propose_at: string;
  accepte_at: string | null;
  verifie_at: string | null;
  termine_at: string | null;
  grace_expire_at: string | null;
  raison: string | null;
}

export class ErreurEchange extends Error {
  constructor(public status: number, message: string) { super(message); }
}

// ─── Link detection ─────────────────────────────────────────────────────────

// True when the page has an <a href> pointing to the partner's domain (www. or not, any path)
export function contientLienVers(html: string, domainePartenaire: string): boolean {
  for (const m of html.matchAll(/<a\b[^>]*?\bhref\s*=\s*["']([^"']+)["']/gi)) {
    const href = m[1].trim();
    if (!/^https?:\/\//i.test(href)) continue;
    if (normaliserDomaine(href) === domainePartenaire) return true;
  }
  return false;
}

export async function verifierLien(url: string, domainePartenaire: string, fetchImpl: FetchFn = fetch): Promise<{ present: boolean; raison?: string }> {
  const page = await recupererTexte(url, fetchImpl);
  if (!page.ok) return { present: false, raison: `Page ${page.raison}` };
  return contientLienVers(page.texte, domainePartenaire)
    ? { present: true }
    : { present: false, raison: `Aucun lien vers ${domainePartenaire} sur la page` };
}

// ─── Helpers ────────────────────────────────────────────────────────────────

async function membre(userId: string) {
  return must(await getSupabase().from('forge_members').select('user_id,url_site,statut,tier_abonnement').eq('user_id', userId).maybeSingle(), 'forge_members select');
}

async function echangesDe(userId: string): Promise<Echange[]> {
  const sb = getSupabase();
  const a = must(await sb.from('forge_exchanges').select('*').eq('membre_a', userId), 'forge_exchanges select') ?? [];
  const b = must(await sb.from('forge_exchanges').select('*').eq('membre_b', userId), 'forge_exchanges select') ?? [];
  return [...a, ...b] as Echange[];
}

async function echangeDe(userId: string, id: string): Promise<{ e: Echange; cote: 'a' | 'b' }> {
  const e = must(await getSupabase().from('forge_exchanges').select('*').eq('id', id).maybeSingle(), 'forge_exchanges select') as Echange | null;
  if (!e || (e.membre_a !== userId && e.membre_b !== userId)) throw new ErreurEchange(404, 'Échange introuvable.');
  return { e, cote: e.membre_a === userId ? 'a' : 'b' };
}

async function majEchange(id: string, champs: Partial<Echange>) {
  must(await getSupabase().from('forge_exchanges').update(champs).eq('id', id), 'forge_exchanges update');
}

const lectureSeule = (m: { tier_abonnement?: string } | null) => !m || m.tier_abonnement === 'bronze';

// Partners with an exchange in progress or verified: the matchmaking does not suggest them again
export async function partenairesActifs(userId: string): Promise<Set<string>> {
  const out = new Set<string>();
  for (const e of await echangesDe(userId)) {
    if (STATUTS_ACTIFS.includes(e.statut)) out.add(e.membre_a === userId ? e.membre_b : e.membre_a);
  }
  return out;
}

// ─── Member actions ─────────────────────────────────────────────────────────

export async function proposerEchange(userId: string, partenaireId: unknown, now = new Date()): Promise<Echange> {
  if (typeof partenaireId !== 'string' || !partenaireId) throw new ErreurEchange(400, 'partenaire_id requis.');
  if (partenaireId === userId) throw new ErreurEchange(400, 'Impossible d’échanger avec soi-même.');
  const moi = await membre(userId);
  if (lectureSeule(moi)) throw new ErreurEchange(403, 'Passe à Silver ou plus pour échanger des backlinks.');
  const lui = await membre(partenaireId);
  if (!lui || lui.statut !== 'actif') throw new ErreurEchange(404, 'Partenaire introuvable ou inactif.');
  if ((await partenairesActifs(userId)).has(partenaireId)) throw new ErreurEchange(409, 'Un échange est déjà en cours avec ce partenaire.');
  const e = must(await getSupabase().from('forge_exchanges').insert({
    membre_a: userId, membre_b: partenaireId, statut: 'propose', verifie_a: false, verifie_b: false, propose_at: now.toISOString(),
  }).select().single(), 'forge_exchanges insert');
  return e as Echange;
}

export async function repondreEchange(userId: string, id: string, accepter: boolean, now = new Date()): Promise<StatutEchange> {
  const { e, cote } = await echangeDe(userId, id);
  if (cote !== 'b') throw new ErreurEchange(403, 'Seul le partenaire invité peut répondre.');
  if (e.statut !== 'propose') throw new ErreurEchange(409, `Échange déjà ${e.statut}.`);
  if (accepter && lectureSeule(await membre(userId))) throw new ErreurEchange(403, 'Passe à Silver ou plus pour échanger des backlinks.');
  const statut: StatutEchange = accepter ? 'accepte' : 'refuse';
  await majEchange(id, accepter ? { statut, accepte_at: now.toISOString() } : { statut, termine_at: now.toISOString() });
  return statut;
}

// The member declares the page of their own site that links to the partner; the server checks it now
export async function declarerLien(userId: string, id: string, url: unknown, deps: { fetchImpl?: FetchFn; now?: Date } = {}) {
  const now = deps.now ?? new Date();
  const { e, cote } = await echangeDe(userId, id);
  if (e.statut !== 'accepte' && e.statut !== 'publie') throw new ErreurEchange(409, `Impossible de déclarer un lien sur un échange ${e.statut}.`);
  if (typeof url !== 'string' || !/^https?:\/\//i.test(url.trim())) throw new ErreurEchange(400, 'URL de la page requise (http ou https).');
  const autreId = cote === 'a' ? e.membre_b : e.membre_a;
  const [moi, autre] = [await membre(userId), await membre(autreId)];
  const monDomaine = normaliserDomaine(moi?.url_site);
  const domainePartenaire = normaliserDomaine(autre?.url_site);
  if (!monDomaine || !domainePartenaire) throw new ErreurEchange(400, 'Site du membre ou du partenaire invalide.');
  if (normaliserDomaine(url) !== monDomaine) throw new ErreurEchange(400, `La page doit être sur ton site (${monDomaine}).`);

  const { present, raison } = await verifierLien(url.trim(), domainePartenaire, deps.fetchImpl);
  const champs: Partial<Echange> = cote === 'a' ? { url_a: url.trim(), verifie_a: present } : { url_b: url.trim(), verifie_b: present };
  const verifA = cote === 'a' ? present : e.verifie_a;
  const verifB = cote === 'b' ? present : e.verifie_b;
  champs.statut = verifA && verifB ? 'verifie' : 'publie';
  if (champs.statut === 'verifie') { champs.verifie_at = now.toISOString(); champs.raison = null; }
  else if (!present) champs.raison = raison ?? null;
  await majEchange(id, champs);
  return { statut: champs.statut, lien_verifie: present, raison: present ? undefined : raison };
}

export async function listerMesEchanges(userId: string) {
  const echanges = await echangesDe(userId);
  const autres = [...new Set(echanges.map((e) => (e.membre_a === userId ? e.membre_b : e.membre_a)))];
  const sites = autres.length
    ? must(await getSupabase().from('forge_members').select('user_id,url_site,niche').in('user_id', autres), 'forge_members select') ?? []
    : [];
  const siteDe = new Map(sites.map((s: any) => [s.user_id, s]));
  return echanges
    .map((e) => {
      const moiA = e.membre_a === userId;
      const p: any = siteDe.get(moiA ? e.membre_b : e.membre_a);
      return {
        id: e.id, statut: e.statut, role: moiA ? 'propose_par_moi' : 'recu',
        partenaire: { user_id: moiA ? e.membre_b : e.membre_a, url_site: p?.url_site ?? null, niche: p?.niche ?? null },
        mon_lien: { url: (moiA ? e.url_a : e.url_b) ?? null, verifie: !!(moiA ? e.verifie_a : e.verifie_b) },
        son_lien: { url: (moiA ? e.url_b : e.url_a) ?? null, verifie: !!(moiA ? e.verifie_b : e.verifie_a) },
        propose_at: e.propose_at, accepte_at: e.accepte_at, verifie_at: e.verifie_at, termine_at: e.termine_at,
        grace_expire_at: e.grace_expire_at, raison: e.raison,
      };
    })
    .sort((x, y) => String(y.propose_at).localeCompare(String(x.propose_at)));
}

// ─── Daily cron ─────────────────────────────────────────────────────────────

export async function runExchangeCron(deps: { fetchImpl?: FetchFn; now?: Date } = {}) {
  const now = deps.now ?? new Date();
  const sb = getSupabase();
  const actifs = must(await sb.from('forge_exchanges').select('*').in('statut', ['propose', 'accepte', 'publie', 'verifie']), 'forge_exchanges select') as Echange[] ?? [];
  const bilan = { expires: 0, verifies: 0, en_grace: 0, rompus: 0, retablis: 0 };
  const domaineCache = new Map<string, string | null>();
  const domaine = async (id: string) => {
    if (!domaineCache.has(id)) domaineCache.set(id, normaliserDomaine((await membre(id))?.url_site));
    return domaineCache.get(id)!;
  };
  const termine = (e: Echange, statut: StatutEchange, raison: string) => majEchange(e.id, { statut, raison, termine_at: now.toISOString() });

  for (const e of actifs) {
    try {
      const age = (iso: string | null) => (iso ? now.getTime() - Date.parse(iso) : 0);
      if (e.statut === 'propose') {
        if (age(e.propose_at) > DELAI_ACCEPTATION_JOURS * JOUR_MS) { await termine(e, 'expire', `Non accepté en ${DELAI_ACCEPTATION_JOURS} jours`); bilan.expires++; }
        continue;
      }
      const [dA, dB] = [await domaine(e.membre_a), await domaine(e.membre_b)];
      if (!dA || !dB) continue;

      if (e.statut === 'accepte' || e.statut === 'publie') {
        const champs: Partial<Echange> = {};
        if (e.url_a && !e.verifie_a && (await verifierLien(e.url_a, dB, deps.fetchImpl)).present) champs.verifie_a = true;
        if (e.url_b && !e.verifie_b && (await verifierLien(e.url_b, dA, deps.fetchImpl)).present) champs.verifie_b = true;
        const vA = champs.verifie_a ?? e.verifie_a, vB = champs.verifie_b ?? e.verifie_b;
        if (vA && vB) { await majEchange(e.id, { ...champs, statut: 'verifie', verifie_at: now.toISOString(), raison: null }); bilan.verifies++; continue; }
        if (age(e.accepte_at) > DELAI_VERIFICATION_JOURS * JOUR_MS) { await termine(e, 'expire', `Liens non vérifiés des deux côtés en ${DELAI_VERIFICATION_JOURS} jours`); bilan.expires++; continue; }
        if (Object.keys(champs).length) await majEchange(e.id, champs);
        continue;
      }

      // verifie: both links must still be online; a missing one opens a 7-day grace, then 'rompu'
      const ra = e.url_a ? await verifierLien(e.url_a, dB, deps.fetchImpl) : { present: false, raison: 'Lien A absent' };
      const rb = e.url_b ? await verifierLien(e.url_b, dA, deps.fetchImpl) : { present: false, raison: 'Lien B absent' };
      if (ra.present && rb.present) {
        if (e.grace_expire_at) { await majEchange(e.id, { grace_expire_at: null, raison: null }); bilan.retablis++; }
        continue;
      }
      const raison = [!ra.present && ra.raison, !rb.present && rb.raison].filter(Boolean).join(' ; ');
      if (!e.grace_expire_at) {
        await majEchange(e.id, { grace_expire_at: new Date(now.getTime() + GRACE_LIEN_JOURS * JOUR_MS).toISOString(), raison });
        bilan.en_grace++;
      } else if (now.getTime() > Date.parse(e.grace_expire_at)) {
        await termine(e, 'rompu', raison);
        bilan.rompus++;
      }
    } catch (err: any) {
      console.error(`[ExchangeCron] ${e.id} failed:`, err?.message ?? err);
    }
  }
  return bilan;
}
