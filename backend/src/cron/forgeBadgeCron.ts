import cron from 'node-cron';
import { createClient } from '@supabase/supabase-js';
import { traiterVerificationBadge } from '../services/forge/badgeChecker.service';
function getSupabase() { return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!); }
export async function runForgeBadgeCron(): Promise<void> {
  console.log(`[ForgeBadgeCron] Démarrage — ${new Date().toISOString()}`);
  const supabase = getSupabase();
  const { data: membres } = await supabase.from('forge_members').select('user_id,url_site,statut').in('statut', ['actif','suspendu']).not('url_site','is',null);
  if (!membres || membres.length === 0) { console.log('[ForgeBadgeCron] Aucun membre.'); return; }
  console.log(`[ForgeBadgeCron] ${membres.length} membres à vérifier`);
  let ok=0, grace=0, suspendus=0;
  for (let i = 0; i < membres.length; i += 10) {
    const batch = membres.slice(i, i+10);
    await Promise.allSettled(batch.map(async (m: any) => {
      const result = await traiterVerificationBadge(m.user_id, m.url_site);
      if (result.statut === 'verifie') ok++;
      else if (result.statut === 'grace') grace++;
      else if (result.statut === 'suspendu') suspendus++;
    }));
    if (i + 10 < membres.length) await new Promise(r => setTimeout(r, 2000));
  }
  console.log(`[ForgeBadgeCron] OK:${ok} Grace:${grace} Suspendus:${suspendus}`);
}
export function initForgeBadgeCron(): void {
  cron.schedule('0 9 1,15 * *', async () => { await runForgeBadgeCron(); }, { timezone: 'America/Toronto' });
  console.log('[ForgeBadgeCron] Initialisé — 1er et 15 à 9h00 EST');
}
