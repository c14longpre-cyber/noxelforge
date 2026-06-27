import { createClient } from '@supabase/supabase-js';
function getSupabase() { return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!); }
export interface SpamGateResult { passe: boolean; raison?: string; type?: 'spam' | 'bot' | 'pub_automatique' | 'contenu_interdit' | 'blacklist'; }
export interface SpamGateInput { url: string; titre: string; description?: string; contenu?: string; userId: string; }
const PATTERNS_PUB = [/buy\s+now/i,/limited\s+time\s+offer/i,/act\s+now/i,/free\s+money/i,/earn\s+\$\d+/i,/make\s+money\s+fast/i,/casino|poker|slots|gambling/i,/viagra|cialis|pharmacy|pills/i,/crypto\s+profit|bitcoin\s+earn/i,/mlm|multi.?level\s+marketing/i];
const PATTERNS_AI_SPAM = [/as an ai language model/i,/i am an ai/i,/\[insert\s+\w+\]/i,/lorem ipsum/i,/placeholder text/i];
const PATTERNS_BOT_URL = [/\?(utm_|ref=|aff=|click=)/i,/\/redirect\//i,/bit\.ly|tinyurl|t\.co/i];
const TLD_SUSPECTS = ['.xyz','.top','.club','.online','.site','.tk','.ml','.ga','.cf','.gq'];
function extraireDomaine(url: string): string { try { return new URL(url).hostname.toLowerCase(); } catch { return url.toLowerCase(); } }
function verifierURL(url: string): SpamGateResult {
  for (const p of PATTERNS_BOT_URL) if (p.test(url)) return { passe: false, raison: 'URL suspecte.', type: 'bot' };
  const d = extraireDomaine(url);
  for (const tld of TLD_SUSPECTS) if (d.endsWith(tld)) return { passe: false, raison: `Extension non acceptée (${tld})`, type: 'spam' };
  if (!url.startsWith('https://')) return { passe: false, raison: 'HTTPS obligatoire.', type: 'spam' };
  return { passe: true };
}
function verifierPatternsPub(c: string): SpamGateResult { for (const p of PATTERNS_PUB) if (p.test(c)) return { passe: false, raison: 'Contenu publicitaire détecté.', type: 'pub_automatique' }; return { passe: true }; }
function verifierPatternsAiSpam(c: string): SpamGateResult { for (const p of PATTERNS_AI_SPAM) if (p.test(c)) return { passe: false, raison: 'Contenu auto-généré détecté.', type: 'bot' }; return { passe: true }; }
function verifierRatioLiens(contenu: string): SpamGateResult {
  if (!contenu || contenu.length < 100) return { passe: true };
  const nbLiens = (contenu.match(/https?:\/\/[^\s]+/g) || []).length;
  const nbMots = contenu.trim().split(/\s+/).length;
  if (nbLiens / nbMots > 0.05) return { passe: false, raison: `Trop de liens (${nbLiens}/${nbMots} mots).`, type: 'spam' };
  return { passe: true };
}
async function verifierBlacklist(domaine: string): Promise<SpamGateResult> {
  const supabase = getSupabase();
  const { data } = await supabase.from('forge_blacklist').select('raison,type').eq('domaine', domaine).single();
  if (data) return { passe: false, raison: `Domaine blacklisté : ${data.raison}`, type: 'blacklist' };
  return { passe: true };
}
async function verifierRateLimit(userId: string): Promise<SpamGateResult> {
  const supabase = getSupabase();
  const hier = new Date(Date.now() - 24*60*60*1000).toISOString();
  const { count } = await supabase.from('forge_submissions').select('*', { count: 'exact', head: true }).eq('user_id', userId).gte('created_at', hier);
  if (count && count >= 3) return { passe: false, raison: 'Limite 3 soumissions/24h atteinte.', type: 'bot' };
  return { passe: true };
}
export async function runSpamGate(input: SpamGateInput): Promise<SpamGateResult> {
  const contenu = `${input.titre} ${input.description||''} ${input.contenu||''}`;
  const domaine = extraireDomaine(input.url);
  const checks = [await verifierBlacklist(domaine), verifierURL(input.url), verifierPatternsPub(contenu), verifierPatternsAiSpam(contenu), verifierRatioLiens(contenu), await verifierRateLimit(input.userId)];
  return checks.find(c => !c.passe) ?? { passe: true };
}
export async function ajouterBlacklist(domaine: string, type: 'spam'|'bot'|'pub_automatique'|'contenu_interdit'|'manuel', raison: string, ajoute_par: 'alfred'|'admin' = 'alfred'): Promise<void> {
  const supabase = getSupabase();
  await supabase.from('forge_blacklist').upsert({ domaine, type, raison, ajoute_par }, { onConflict: 'domaine' });
}
