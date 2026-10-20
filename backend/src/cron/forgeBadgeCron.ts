import cron from 'node-cron';
import { traiterVerificationBadge } from '../services/forge/badgeChecker.service';
import { getSupabase } from '../lib/supabaseClient';
import { must } from '../lib/supabaseCheck';
const TIMEZONE = 'America/Toronto';

// Full check of every member on the 1st and the 15th; the other days only members in their
// 7-day grace period are checked, so a suspension really falls about 7 days after the badge went missing.
export function estJourVerificationComplete(date: Date = new Date()): boolean {
  const jour = Number(new Intl.DateTimeFormat('en-CA', { timeZone: TIMEZONE, day: 'numeric' }).format(date));
  return jour === 1 || jour === 15;
}

export async function runForgeBadgeCron(opts: { seulementGrace?: boolean } = {}): Promise<void> {
  const seulementGrace = opts.seulementGrace ?? false;
  console.log(`[ForgeBadgeCron] Démarrage (${seulementGrace ? 'membres en grâce' : 'tous les membres'}) — ${new Date().toISOString()}`);
  const supabase = getSupabase();
  let query = supabase.from('forge_members').select('user_id,url_site,statut').in('statut', ['actif','suspendu']).not('url_site','is',null);
  if (seulementGrace) {
    const { data: enGrace, error: graceError } = await supabase.from('forge_badges').select('user_id').eq('statut', 'grace');
    if (graceError) { console.error('[ForgeBadgeCron] Grace query error:', graceError); return; }
    const ids = (enGrace ?? []).map((b: any) => b.user_id);
    if (ids.length === 0) { console.log('[ForgeBadgeCron] Aucun membre en grâce.'); return; }
    query = query.in('user_id', ids);
  }
  const { data: membres, error } = await query;
  if (error) { console.error('[ForgeBadgeCron] Query error:', error); return; }
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
  cron.schedule('0 9 * * *', async () => {
    try { await runForgeBadgeCron({ seulementGrace: !estJourVerificationComplete() }); } catch (err: any) { console.error('[ForgeBadgeCron] run failed:', err?.message ?? err); }
  }, { timezone: TIMEZONE });
  console.log('[ForgeBadgeCron] Initialisé — chaque jour à 9h00 (Toronto) : tous les membres le 1er et le 15, sinon seulement les membres en grâce');
}
