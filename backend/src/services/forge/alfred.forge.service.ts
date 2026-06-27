import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
import { ajouterBlacklist } from './spamGate.service';
function getSupabase() { return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!); }
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
export type AlfredVerdict = 'approuve' | 'rejete' | 'blacklist';
export interface AlfredInput { userId: string; urlSoumise: string; titre: string; description?: string; contenu?: string; niche?: string; trustScore: number; tierForge: string; ageCompteDays: number; scanComplete: boolean; badgeInstalle: boolean; }
export interface AlfredResult { verdict: AlfredVerdict; score: number; raison: string; blacklister: boolean; details: Record<string, any>; }
export function determinerFlux(input: { ageCompteDays: number; scanComplete: boolean; badgeInstalle: boolean; tierAbonnement: string; }): 'auto_share' | 'alfred' | 'bloque' {
  if (input.tierAbonnement === 'bronze') return 'bloque';
  if (input.ageCompteDays < 15 || !input.scanComplete) return 'auto_share';
  if (!input.badgeInstalle) return 'bloque';
  return 'alfred';
}
const ALFRED_SYSTEM = `Tu es Alfred, gardien de NOXEL Forge. Analyse les soumissions et retourne UNIQUEMENT ce JSON:
{"verdict":"approuve"|"rejete"|"blacklist","score":0-100,"raison":"phrase courte","blacklister":true|false,"points_forts":[],"points_faibles":[]}
REJETER si: contenu dupliqué, purement promotionnel, thin content <300 mots, liens suspects, hors niche.
BLACKLISTER si: bot évident, manipulation du réseau, contenu interdit.`;
async function analyserAvecClaude(input: AlfredInput): Promise<AlfredResult> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6', max_tokens: 1000, system: ALFRED_SYSTEM,
    messages: [{ role: 'user', content: `URL: ${input.urlSoumise}\nTitre: ${input.titre}\nDescription: ${input.description||'N/A'}\nNiche: ${input.niche||'N/A'}\nTrust Score: ${input.trustScore}/100\nContenu: ${input.contenu||'Non fourni'}` }],
  });
  const text = response.content.filter((b: any) => b.type === 'text').map((b: any) => b.text).join('');
  const parsed = JSON.parse(text.replace(/```json|```/g, '').trim());
  return { verdict: parsed.verdict, score: parsed.score ?? 50, raison: parsed.raison ?? 'Analyse complétée', blacklister: parsed.blacklister ?? false, details: { points_forts: parsed.points_forts ?? [], points_faibles: parsed.points_faibles ?? [], analyse_at: new Date().toISOString() } };
}
export async function runAlfred(input: AlfredInput): Promise<AlfredResult> {
  try {
    const result = await analyserAvecClaude(input);
    if (result.blacklister || result.verdict === 'blacklist') {
      try { const { hostname } = new URL(input.urlSoumise); await ajouterBlacklist(hostname, 'contenu_interdit', result.raison, 'alfred'); } catch {}
    }
    return result;
  } catch (error) {
    console.error('[Alfred] Erreur:', error);
    return { verdict: 'rejete', score: 0, raison: 'Analyse indisponible. Réessaie dans quelques minutes.', blacklister: false, details: { erreur: 'timeout', analyse_at: new Date().toISOString() } };
  }
}
async function crediterPoints(userId: string, points: number, description: string): Promise<void> {
  const supabase = getSupabase();
  const { data } = await supabase.from('forge_points').select('solde,total_gagne,historique').eq('user_id', userId).single();
  const solde = (data?.solde ?? 0) + points;
  const totalGagne = (data?.total_gagne ?? 0) + points;
  const historique = [...(data?.historique ?? []), { type: 'earn', points, description, date: new Date().toISOString() }];
  await supabase.from('forge_points').upsert({ user_id: userId, solde, total_gagne: totalGagne, historique, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
}
export async function traiterSoumission(submissionId: string, input: AlfredInput): Promise<void> {
  const supabase = getSupabase();
  const flux = determinerFlux({ ageCompteDays: input.ageCompteDays, scanComplete: input.scanComplete, badgeInstalle: input.badgeInstalle, tierAbonnement: input.tierForge });
  if (flux === 'bloque') {
    await supabase.from('forge_submissions').update({ statut: 'rejete', flux: 'alfred', alfred_raison: 'Compte non éligible.', updated_at: new Date().toISOString() }).eq('id', submissionId);
    return;
  }
  if (flux === 'auto_share') {
    await supabase.from('forge_submissions').update({ statut: 'auto_share', flux: 'auto', alfred_score: 100, alfred_raison: 'Publication automatique — nouveau membre bienvenu!', backlink_noxel_actif: true, updated_at: new Date().toISOString() }).eq('id', submissionId);
    await crediterPoints(input.userId, 50, 'Soumission auto-share');
    return;
  }
  const result = await runAlfred(input);
  await supabase.from('forge_submissions').update({ statut: result.verdict === 'approuve' ? 'approuve' : 'rejete', flux: 'alfred', alfred_score: result.score, alfred_raison: result.raison, backlink_noxel_actif: result.verdict === 'approuve', updated_at: new Date().toISOString() }).eq('id', submissionId);
  if (result.verdict === 'approuve') await crediterPoints(input.userId, 50, 'Soumission approuvée par Alfred');
}
