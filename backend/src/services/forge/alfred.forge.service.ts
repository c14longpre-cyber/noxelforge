import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
import { ajouterBlacklist } from './spamGate.service';

function getSupabase() { return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!); }
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

export type AlfredVerdict = 'approuve' | 'rejete' | 'blacklist';

export interface AlfredInput { userId: string; urlSoumise: string; titre: string; description?: string; contenu?: string; niche?: string; trustScore: number; tierForge: string; ageCompteDays: number; scanComplete: boolean; badgeInstalle: boolean; }
export interface AlfredResult { verdict: AlfredVerdict; score: number; raison: string; blacklister: boolean; details: Record<string, any>; }
export interface UrlScanResult { accessible: boolean; hasBacklink: boolean; raison?: string; }

export function determinerFlux(input: { ageCompteDays: number; scanComplete: boolean; badgeInstalle: boolean; tierAbonnement: string; }): 'alfred' | 'bloque' {
  if (input.tierAbonnement === 'bronze') return 'bloque';
  return 'alfred';
}

async function scanUrl(url: string): Promise<UrlScanResult> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, { method: 'GET', signal: controller.signal, headers: { 'User-Agent': 'NOXELForge-Bot/1.0' } });
    clearTimeout(timeout);
    if (!res.ok) return { accessible: false, hasBacklink: false, raison: `URL inaccessible (HTTP ${res.status})` };
    const html = await res.text();
    const hasBacklink = html.includes('noxelseo.com') || html.includes('noxelforge.com');
    return { accessible: true, hasBacklink, raison: hasBacklink ? undefined : 'Backlink NOXEL introuvable sur la page' };
  } catch (err: any) {
    if (err.name === 'AbortError') return { accessible: false, hasBacklink: false, raison: 'URL timeout (>8s)' };
    return { accessible: false, hasBacklink: false, raison: 'URL inaccessible ou invalide' };
  }
}

const ALFRED_SYSTEM = `Tu es Alfred, gardien de NOXEL Forge. Analyse les soumissions et retourne UNIQUEMENT ce JSON:
{"verdict":"approuve"|"rejete"|"blacklist","score":0-100,"raison":"phrase courte","blacklister":true|false,"points_forts":[],"points_faibles":[]}
REJETER si: contenu dupliqué, purement promotionnel, thin content <300 mots, liens suspects, hors niche.
BLACKLISTER si: bot évident, manipulation du réseau, contenu interdit.`;

async function analyserAvecClaude(input: AlfredInput): Promise<AlfredResult> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6', max_tokens: 1000, system: ALFRED_SYSTEM,
    messages: [{ role: 'user', content: `URL: ${input.urlSoumise}\nTitre: ${input.titre}\nDescription: ${input.description||'N/A'}\nNiche: ${input.niche||'N/A'}\nTrust Score: ${input.trustScore}/100\nAge compte: ${input.ageCompteDays} jours\nContenu: ${input.contenu||'Non fourni'}` }],
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

  if (input.tierForge === 'bronze') {
    await supabase.from('forge_submissions').update({ statut: 'rejete', flux: 'bloque', alfred_raison: 'Tier Bronze — accès lecture seulement. Upgrade vers Silver pour soumettre.', updated_at: new Date().toISOString() }).eq('id', submissionId);
    return;
  }

  const urlScan = await scanUrl(input.urlSoumise);
  if (!urlScan.accessible) {
    await supabase.from('forge_submissions').update({ statut: 'rejete', flux: 'scan', alfred_raison: urlScan.raison || 'URL inaccessible.', updated_at: new Date().toISOString() }).eq('id', submissionId);
    return;
  }

  if (!urlScan.hasBacklink) {
    await supabase.from('forge_submissions').update({ statut: 'rejete', flux: 'scan', alfred_raison: 'Backlink vers noxelseo.com ou noxelforge.com introuvable sur la page.', updated_at: new Date().toISOString() }).eq('id', submissionId);
    return;
  }

  const result = await runAlfred(input);
  await supabase.from('forge_submissions').update({ statut: result.verdict === 'approuve' ? 'approuve' : 'rejete', flux: 'alfred', alfred_score: result.score, alfred_raison: result.raison, backlink_noxel_actif: result.verdict === 'approuve', updated_at: new Date().toISOString() }).eq('id', submissionId);
  if (result.verdict === 'approuve') await crediterPoints(input.userId, 50, 'Soumission approuvée par Alfred');
}
