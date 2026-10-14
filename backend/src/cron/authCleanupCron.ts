import cron from 'node-cron';
import { purgerDonneesAuthExpirees } from '../services/authCleanup.service';

export async function runAuthCleanupCron(): Promise<void> {
  try {
    await purgerDonneesAuthExpirees();
  } catch (err) {
    console.error('[AuthCleanupCron] Échec de la purge:', err);
  }
}

export function initAuthCleanupCron(): void {
  cron.schedule('0 * * * *', async () => { await runAuthCleanupCron(); }, { timezone: 'America/Toronto' });
  console.log('[AuthCleanupCron] Initialisé — toutes les heures (purge magic_links et passkey_challenges expirés)');
}
