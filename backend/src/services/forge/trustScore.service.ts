import { getSupabase } from '../../lib/supabaseClient';
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
  if (score >= 86) return 'diamond';
  if (score >= 66) return 'gold';
  if (score >= 41) return 'silver';
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

export function calculerTrustScore(input: TrustScoreInput): TrustScoreResult {
  const signaux = {
    technique: calculerSignalTechnique(input.scoresTechnique),
    autorite: calculerSignalAutorite(input.domainAuthority),
    spam: calculerSignalSpam(input.spamScore),
    contenu: calculerSignalContenu(input.qualiteContenu),
    anciennete: calculerSignalAnciennete(input.ageDomaineAnnees),
    frequence: calculerSignalFrequence(input.publicationsParMois),
  };
  const score = Math.min(Object.values(signaux).reduce((a,b) => a+b, 0), 100);
  return { score, tier: scoreVersTimer(score), signaux, details: { inputs: input, calcule_at: new Date().toISOString() } };
}

export async function sauvegarderTrustScore(userId: string, result: TrustScoreResult): Promise<void> {
  const supabase = getSupabase();
  await supabase.from('forge_trust_scores').upsert({
    user_id: userId, score: result.score, tier_forge: result.tier,
    signal_technique: result.signaux.technique, signal_autorite: result.signaux.autorite,
    signal_spam: result.signaux.spam, signal_contenu: result.signaux.contenu,
    signal_anciennete: result.signaux.anciennete, signal_frequence: result.signaux.frequence,
    details: result.details, calcule_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });
}

export async function recalculerTrustScore(input: TrustScoreInput): Promise<TrustScoreResult> {
  const supabase = getSupabase();
  const result = calculerTrustScore(input);
  await sauvegarderTrustScore(input.userId, result);
  await supabase.from('forge_members').update({ updated_at: new Date().toISOString() }).eq('user_id', input.userId);
  return result;
}

export async function getTrustScore(userId: string): Promise<TrustScoreResult | null> {
  const supabase = getSupabase();
  const { data } = await supabase.from('forge_trust_scores').select('*').eq('user_id', userId).single();
  if (!data) return null;
  return {
    score: data.score, tier: data.tier_forge as TierForge,
    signaux: { technique: data.signal_technique, autorite: data.signal_autorite, spam: data.signal_spam, contenu: data.signal_contenu, anciennete: data.signal_anciennete, frequence: data.signal_frequence },
    details: data.details,
  };
}
