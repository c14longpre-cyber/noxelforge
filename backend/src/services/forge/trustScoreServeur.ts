// Server-side Trust Score: every signal comes from a server source, never from the member.
//   technique  -> NOXEL SEO full-scan (not wired yet: counts 0 with a reason)
//   anciennete -> RDAP                 frequence -> sitemap.xml, else RSS/Atom
//   contenu    -> Alfred               autorite, spam -> admin entry (FORGE_ADMIN_EMAILS)
// Collected values are cached 30 days; a failed source is retried on the next computation.
// Until an admin has entered authority and spam, the score is "en_attente" (no figure, no tier).
import { getSupabase } from '../../lib/supabaseClient';
import { must } from '../../lib/supabaseCheck';
import { calculerTrustScore, TierForge } from './trustScore.service';
import { normaliserDomaine } from './trustScorePublic';
import { collecterAgeDomaine } from './signals/rdap';
import { collecterFrequence } from './signals/frequence';
import { collecterContenu, EvaluateurContenu } from './signals/contenu';
import type { FetchFn, NomSignal, SignalCollecte, SourcesSignaux } from './signals/types';

export const CACHE_JOURS = 30;
const JOUR_MS = 24 * 60 * 60 * 1000;
export const RAISON_NSE_NON_BRANCHE = 'Source NOXEL SEO pas encore branchée';
export const RAISON_SITE_INVALIDE = 'URL du site invalide ou absente';

export type StatutScore = 'en_attente' | 'calcule';

export interface ResultatServeur {
  statut: StatutScore;
  score: number | null;
  tier: TierForge | null;
  points: Record<NomSignal, number | null>;
  sources: SourcesSignaux;
}

export interface DepsServeur {
  fetchImpl?: FetchFn;
  evaluerContenu?: EvaluateurContenu;
  now?: () => Date;
}

export function encoreValide(s: SignalCollecte | undefined, now: Date): s is SignalCollecte {
  if (!s || s.valeur === null) return false;
  const t = Date.parse(s.collecte_at);
  return !Number.isNaN(t) && now.getTime() - t < CACHE_JOURS * JOUR_MS;
}

// Only admin entries count for authority and spam: anything else stored there is ignored
const saisieAdmin = (s: SignalCollecte | undefined) => (s && s.source === 'admin' && typeof s.valeur === 'number' ? s : undefined);

export function calculerDepuisSources(sources: SourcesSignaux): ResultatServeur {
  const v = (n: NomSignal) => sources[n]?.valeur ?? null;
  const autorite = saisieAdmin(sources.autorite);
  const spam = saisieAdmin(sources.spam);
  const r = calculerTrustScore({
    userId: '', urlSite: '',
    scoresTechnique: v('technique') ?? 0,
    qualiteContenu: v('contenu') ?? 0,
    ageDomaineAnnees: v('anciennete') ?? 0,
    publicationsParMois: v('frequence') ?? 0,
    domainAuthority: autorite?.valeur ?? 0,
    spamScore: spam?.valeur ?? 100,
  });
  if (!autorite || !spam) {
    return {
      statut: 'en_attente', score: null, tier: null, sources,
      points: { ...r.signaux, autorite: autorite ? r.signaux.autorite : null, spam: spam ? r.signaux.spam : null },
    };
  }
  return { statut: 'calcule', score: r.score, tier: r.tier, points: r.signaux, sources };
}

async function lireSources(userId: string): Promise<SourcesSignaux> {
  const row = must(await getSupabase().from('forge_trust_scores').select('signaux_sources').eq('user_id', userId).maybeSingle(), 'forge_trust_scores select');
  const s = row?.signaux_sources;
  return s && typeof s === 'object' ? (s as SourcesSignaux) : {};
}

async function sauvegarder(userId: string, r: ResultatServeur, now: Date): Promise<void> {
  const supabase = getSupabase();
  must(await supabase.from('forge_trust_scores').upsert({
    user_id: userId, statut: r.statut, score: r.score, tier_forge: r.tier,
    signal_technique: r.points.technique, signal_autorite: r.points.autorite, signal_spam: r.points.spam,
    signal_contenu: r.points.contenu, signal_anciennete: r.points.anciennete, signal_frequence: r.points.frequence,
    signaux_sources: r.sources, details: { calcul: 'serveur' }, calcule_at: now.toISOString(),
  }, { onConflict: 'user_id' }), 'forge_trust_scores upsert');
  must(await supabase.from('forge_members').update({ updated_at: now.toISOString() }).eq('user_id', userId), 'forge_members update');
}

// Collects what is missing or older than 30 days, computes, stores. Returns null if the member does not exist.
export async function recalculerTrustScoreServeur(userId: string, deps: DepsServeur = {}): Promise<ResultatServeur | null> {
  const now = (deps.now ?? (() => new Date()))();
  const opts = { fetchImpl: deps.fetchImpl, now: () => now };
  const membre = must(await getSupabase().from('forge_members').select('url_site').eq('user_id', userId).maybeSingle(), 'forge_members select');
  if (!membre) return null;

  const precedentes = await lireSources(userId);
  const domaine = normaliserDomaine(membre.url_site);
  const at = now.toISOString();
  const echec = (source: SignalCollecte['source'], raison: string): SignalCollecte => ({ valeur: null, source, collecte_at: at, raison });

  const collecter = async (nom: NomSignal, source: SignalCollecte['source'], f: (d: string) => Promise<SignalCollecte>) => {
    if (encoreValide(precedentes[nom], now)) return precedentes[nom]!;
    return domaine ? f(domaine) : echec(source, RAISON_SITE_INVALIDE);
  };

  const sources: SourcesSignaux = {
    technique: encoreValide(precedentes.technique, now) ? precedentes.technique : echec('nse', RAISON_NSE_NON_BRANCHE),
    anciennete: await collecter('anciennete', 'rdap', (d) => collecterAgeDomaine(d, opts)),
    frequence: await collecter('frequence', 'sitemap', (d) => collecterFrequence(d, opts)),
    contenu: await collecter('contenu', 'alfred', (d) => collecterContenu(d, { ...opts, ...(deps.evaluerContenu ? { evaluer: deps.evaluerContenu } : {}) })),
    autorite: saisieAdmin(precedentes.autorite),
    spam: saisieAdmin(precedentes.spam),
  };
  if (!sources.autorite) delete sources.autorite;
  if (!sources.spam) delete sources.spam;

  const resultat = calculerDepuisSources(sources);
  await sauvegarder(userId, resultat, now);
  return resultat;
}

// A member may ask for a recomputation at most every 10 minutes (failed sources, Alfred included, are retried on each one)
export const DELAI_RECALCUL_MIN = 10;

export async function minutesAvantRecalcul(userId: string, now: Date = new Date()): Promise<number> {
  const row = must(await getSupabase().from('forge_trust_scores').select('calcule_at').eq('user_id', userId).maybeSingle(), 'forge_trust_scores select');
  const t = row?.calcule_at ? Date.parse(row.calcule_at) : NaN;
  if (Number.isNaN(t)) return 0;
  const restant = DELAI_RECALCUL_MIN * 60_000 - (now.getTime() - t);
  return restant > 0 ? Math.ceil(restant / 60_000) : 0;
}

export class ErreurSaisieAdmin extends Error {}

// Admin entry of authority and/or spam (0-100, out-of-range values are refused, not clamped), then recomputation
export async function enregistrerSaisieAdmin(
  userId: string, valeurs: { domainAuthority?: unknown; spamScore?: unknown }, adminEmail: string, deps: DepsServeur = {},
): Promise<ResultatServeur | null> {
  const now = (deps.now ?? (() => new Date()))();
  const champs: [NomSignal, unknown][] = [['autorite', valeurs.domainAuthority], ['spam', valeurs.spamScore]];
  const fournis = champs.filter(([, v]) => v !== undefined && v !== null);
  if (!fournis.length) throw new ErreurSaisieAdmin('domainAuthority et/ou spamScore requis.');
  for (const [nom, v] of fournis) {
    if (typeof v !== 'number' || !Number.isFinite(v) || v < 0 || v > 100) throw new ErreurSaisieAdmin(`${nom} doit être un nombre entre 0 et 100.`);
  }

  const membre = must(await getSupabase().from('forge_members').select('user_id').eq('user_id', userId).maybeSingle(), 'forge_members select');
  if (!membre) return null;

  const sources = await lireSources(userId);
  for (const [nom, v] of fournis) {
    sources[nom] = { valeur: v as number, source: 'admin', collecte_at: now.toISOString(), saisi_par: adminEmail.toLowerCase() };
  }
  must(await getSupabase().from('forge_trust_scores').upsert({ user_id: userId, signaux_sources: sources }, { onConflict: 'user_id' }), 'forge_trust_scores upsert');
  return recalculerTrustScoreServeur(userId, { ...deps, now: () => now });
}

// Admin list: every member with the state of their Trust Score, scores waiting for verification first
export interface MembreAdmin {
  user_id: string;
  email: string | null;
  url_site: string | null;
  niche: string | null;
  statut_membre: string | null;
  tier_abonnement: string | null;
  statut_score: StatutScore | null; // null: never computed
  score: number | null;
  tier_forge: string | null;
  calcule_at: string | null;
  sources: SourcesSignaux;
}

export async function listerMembresAdmin(): Promise<MembreAdmin[]> {
  const supabase = getSupabase();
  const membres = must(await supabase.from('forge_members')
    .select('user_id,url_site,niche,statut,tier_abonnement').limit(1000), 'forge_members select') ?? [];
  if (!membres.length) return [];
  const ids = membres.map((m: any) => m.user_id);
  const scores = must(await supabase.from('forge_trust_scores')
    .select('user_id,statut,score,tier_forge,calcule_at,signaux_sources').in('user_id', ids), 'forge_trust_scores select') ?? [];
  const users = must(await supabase.from('users').select('id,email').in('id', ids), 'users select') ?? [];
  const scoreDe = new Map(scores.map((s: any) => [s.user_id, s]));
  const emailDe = new Map(users.map((u: any) => [u.id, u.email]));
  const rang = (s: StatutScore | null) => (s === 'en_attente' ? 0 : s === null ? 1 : 2);
  return membres.map((m: any): MembreAdmin => {
    const s: any = scoreDe.get(m.user_id);
    return {
      user_id: m.user_id, email: emailDe.get(m.user_id) ?? null, url_site: m.url_site ?? null, niche: m.niche ?? null,
      statut_membre: m.statut ?? null, tier_abonnement: m.tier_abonnement ?? null,
      statut_score: s?.statut ?? null, score: typeof s?.score === 'number' ? s.score : null,
      tier_forge: s?.tier_forge ?? null, calcule_at: s?.calcule_at ?? null,
      sources: s?.signaux_sources && typeof s.signaux_sources === 'object' ? s.signaux_sources : {},
    };
  }).sort((a, b) => rang(a.statut_score) - rang(b.statut_score) || String(a.url_site).localeCompare(String(b.url_site)));
}
