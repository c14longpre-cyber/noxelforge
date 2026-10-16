import cron from 'node-cron';
import { traiterVerificationBadge } from '../services/forge/badgeChecker.service';
import { getSupabase } from '../lib/supabaseClient';
import { must } from '../lib/supabaseCheck';
export async function runForgeBadgeCron(): Promise<void> {
  console.log(`[ForgeBadgeCron] Démarrage — ${new Date().toISOString()}`);
  const supabase = getSupabase();
  const membres = must(await supabase.from('forge_members').select('user_id,url_site,statut').in('statut', ['actif','suspendu']).not('url_site','is',null), 'forge_members select');
  if (!membres || membres.length === 0) { console.log('[ForgeBadgeCron] Aucun membre.'); return; }
  console.log(`[ForgeBadgeCron] ${membres.length} membres à vérifier`);
  let ok=0, grace=0, suspendus=0;
  for (let i = 0; i < membres.length; i += 10) {
    const batch = membres.slice(i, i+10);
    const results = await Promise.allSettled(batch.map(async (m: any) => {
      const result = await traiterVerificationBadge(m.user_id, m.url_site);
      if (result.statut === 'verifie') ok++;
      else if (result.statut === 'grace') grace++;
      else if (result.statut === 'suspendu') suspendus++;
    }));
    results.forEach((r, j) => {
      if (r.status === 'rejected') console.error(`[ForgeBadgeCron] ${batch[j].user_id} failed:`, r.reason?.message ?? r.reason);
    });
    if (i + 10 < membres.length) await new Promise(r => setTimeout(r, 2000));
  }
  console.log(`[ForgeBadgeCron] OK:${ok} Grace:${grace} Suspendus:${suspendus}`);
}
export function initForgeBadgeCron(): void {
  cron.schedule('0 9 1,15 * *', async () => {
    try { await runForgeBadgeCron(); } catch (err: any) { console.error('[ForgeBadgeCron] run failed:', err?.message ?? err); }
  }, { timezone: 'America/Toronto' });
  console.log('[ForgeBadgeCron] Initialisé — 1er et 15 à 9h00 EST');
}
