import { getSupabase } from '../../lib/supabaseClient';
// ============================================================
// NOXEL Forge™ — Matchmaking Engine V1 (rule-based)
// backend/src/services/forge/matchmaking.service.ts
// ============================================================
// Niches complémentaires — un échange entre ces paires a du sens même sans niche identique
const NICHES_COMPLEMENTAIRES: Record<string, string[]> = {
  SEO: ['Marketing', 'Web Dev', 'AI'],
  Marketing: ['SEO', 'E-commerce', 'Business'],
  AI: ['SEO', 'Web Dev', 'Business'],
  'E-commerce': ['Marketing', 'Design', 'Finance'],
  'Web Dev': ['SEO', 'AI', 'Design'],
  Business: ['Marketing', 'Finance', 'AI'],
  Design: ['Web Dev', 'E-commerce', 'Business'],
  Finance: ['Business', 'E-commerce'],
  Health: ['Education'],
  Education: ['Health', 'Business'],
};

const TIER_ORDER = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];

export interface PartnerSuggestion {
  user_id: string;
  url_site: string;
  niche: string;
  tier_abonnement: string;
  trust_score: number;
  trust_tier: string;
  score_matchmaking: number;
  raison: string;
}

function scoreNiche(nicheA: string, nicheB: string): { pts: number; label: string } {
  if (!nicheA || !nicheB) return { pts: 5, label: 'Niche non précisée' };
  if (nicheA === nicheB) return { pts: 40, label: `Même niche (${nicheA})` };
  if (NICHES_COMPLEMENTAIRES[nicheA]?.includes(nicheB)) {
    return { pts: 20, label: `Niches complémentaires (${nicheA} ↔ ${nicheB})` };
  }
  return { pts: 5, label: 'Niches différentes' };
}

function scoreTierProximity(tierA: string, tierB: string): { pts: number; label: string } {
  const iA = TIER_ORDER.indexOf(tierA);
  const iB = TIER_ORDER.indexOf(tierB);
  if (iA < 0 || iB < 0) return { pts: 0, label: '' };
  const distance = Math.abs(iA - iB);
  if (distance === 0) return { pts: 30, label: 'Trust Score équivalent' };
  if (distance === 1) return { pts: 18, label: 'Trust Score proche' };
  if (distance === 2) return { pts: 8, label: '' };
  return { pts: 0, label: '' };
}

function scoreActivite(badgeInstalle: boolean, scanComplete: boolean): { pts: number; label: string } {
  if (badgeInstalle && scanComplete) return { pts: 20, label: 'Membre actif et vérifié' };
  if (badgeInstalle) return { pts: 10, label: 'Badge installé' };
  return { pts: 0, label: '' };
}

function scoreFraicheur(updatedAt: string): { pts: number; label: string } {
  const jours = (Date.now() - new Date(updatedAt).getTime()) / (1000 * 60 * 60 * 24);
  if (jours <= 30) return { pts: 10, label: 'Actif récemment' };
  if (jours <= 90) return { pts: 5, label: '' };
  return { pts: 0, label: '' };
}

export async function getRecommendedPartners(
  userId: string,
  limit = 20
): Promise<PartnerSuggestion[]> {
  const supabase = getSupabase();

  const { data: moi } = await supabase
    .from('forge_members')
    .select('user_id, niche, tier_abonnement, badge_installe, scan_complete')
    .eq('user_id', userId)
    .single();

  if (!moi) return [];

  const { data: candidats } = await supabase
    .from('forge_members')
    .select('user_id, url_site, niche, tier_abonnement, badge_installe, scan_complete, statut, updated_at')
    .eq('statut', 'actif')
    .neq('user_id', userId)
    .eq('badge_installe', true)
    .limit(200);

  if (!candidats || candidats.length === 0) return [];

  const userIds = candidats.map((c) => c.user_id);
  const { data: trustScores } = await supabase
    .from('forge_trust_scores')
    .select('user_id, score, tier_forge')
    .in('user_id', userIds);

  const trustMap = new Map((trustScores ?? []).map((t) => [t.user_id, t]));

  const suggestions: PartnerSuggestion[] = candidats.map((c) => {
    const trust = trustMap.get(c.user_id);
    const nicheScore = scoreNiche(moi.niche, c.niche);
    const tierScore = scoreTierProximity(moi.tier_abonnement, c.tier_abonnement);
    const activiteScore = scoreActivite(c.badge_installe, c.scan_complete);
    const fraicheurScore = scoreFraicheur(c.updated_at);

    const total = nicheScore.pts + tierScore.pts + activiteScore.pts + fraicheurScore.pts;
    const raison = [nicheScore.label, tierScore.label, activiteScore.label, fraicheurScore.label]
      .filter(Boolean)
      .join(' · ');

    return {
      user_id: c.user_id,
      url_site: c.url_site,
      niche: c.niche,
      tier_abonnement: c.tier_abonnement,
      trust_score: trust?.score ?? 0,
      trust_tier: trust?.tier_forge ?? 'bronze',
      score_matchmaking: total,
      raison,
    };
  });

  return suggestions
    .sort((a, b) => b.score_matchmaking - a.score_matchmaking)
    .slice(0, limit);
}
