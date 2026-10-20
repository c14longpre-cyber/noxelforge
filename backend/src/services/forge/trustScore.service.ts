import { getSupabase } from '../../lib/supabaseClient';
import { must } from '../../lib/supabaseCheck';
export type TierForge = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface TrustScoreInput {
  userId: string;
  urlSite: string;
  scoresTechnique?: number;
  domainAuthority?: number;
  spamScore?: number;
  qualiteContenu?: number;
  ageDomaineAnnees?: number;
  publicationsParMois?: number;
}

export interface TrustScoreResult {
  score: number;
  tier: TierForge;
  signaux: {
    technique: number;
    autorite: number;
    spam: number;
    contenu: number;
    anciennete: number;
    frequence: number;
  };
  details: Record<string, any>;
}

function scoreVersTimer(score: number): TierForge {
  if (score >= 85) return 'diamond';
  if (score >= 70) return 'platinum';
  if (score >= 55) return 'gold';
  if (score >= 40) return 'silver';
  return 'bronze';
}

function calculerSignalTechnique(v?: number): number { return Math.round((Math.min(v ?? 0, 100) / 100) * 25); }
function calculerSignalAutorite(da?: number): number {
  const d = da ?? 0;
  let s = d >= 60 ? 100 : d >= 30 ? 60 + ((d-30)/30)*40 : d >= 10 ? 20 + ((d-10)/20)*40 : (d/10)*20;
  return Math.round((s/100)*25);
}
function calculerSignalSpam(v?: number): number { return Math.round((Math.max(0, 100-(v??0))/100)*20); }
function calculerSignalContenu(v?: number): number { return Math.round((Math.min(v??0,100)/100)*15); }
function calculerSignalAnciennete(age?: number): number {
  const a = age ?? 0;
  let s = a >= 5 ? 100 : a >= 2 ? 70+((a-2)/3)*30 : a >= 1 ? 40+((a-1)/1)*30 : a*40;
  return Math.round((s/100)*10);
}
function calculerSignalFrequence(freq?: number): number {
  const f = freq ?? 0;
  let s = f >= 4 ? 100 : f >= 1 ? 40+((f-1)/3)*60 : 0;
  return Math.round((s/100)*5);
}

// Negative, NaN or non-numeric inputs count as 0; percentages are capped at 100.
// Without this, spamScore=-50 gave a spam signal of 30/20 and negative inputs a negative score.
function borner(v: unknown, max = Infinity): number {
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(Math.max(n, 0), max) : 0;
}

export function calculerTrustScore(input: TrustScoreInput): TrustScoreResult {
  const signaux = {
    technique: calculerSignalTechnique(borner(input.scoresTechnique, 100)),
    autorite: calculerSignalAutorite(borner(input.domainAuthority, 100)),
    spam: calculerSignalSpam(borner(input.spamScore, 100)),
    contenu: calculerSignalContenu(borner(input.qualiteContenu, 100)),
    anciennete: calculerSignalAnciennete(borner(input.ageDomaineAnnees)),
    frequence: calculerSignalFrequence(borner(input.publicationsParMois)),
  };
  const score = Math.min(Math.max(Object.values(signaux).reduce((a,b) => a+b, 0), 0), 100);
  return { score, tier: scoreVersTimer(score), signaux, details: { inputs: input, calcule_at: new Date().toISOString() } };
}

export async function getTrustScore(userId: string): Promise<TrustScoreResult | null> {
  const supabase = getSupabase();
  const data = must(await supabase.from('forge_trust_scores').select('*').eq('user_id', userId).maybeSingle(), 'forge_trust_scores select');
  // A score still waiting for the admin entry (authority, spam) has no figure: treated as no score
  if (!data || data.statut === 'en_attente' || typeof data.score !== 'number') return null;
  return {
    score: data.score, tier: data.tier_forge as TierForge,
    signaux: { technique: data.signal_technique, autorite: data.signal_autorite, spam: data.signal_spam, contenu: data.signal_contenu, anciennete: data.signal_anciennete, frequence: data.signal_frequence },
    details: data.details,
  };
}
