import cron from 'node-cron';
import { terminerOffresExpirees } from '../services/forge/codesAcces.service';

// Forfaits offerts par un code d'accès : retour au forfait d'avant à la fin de l'offre (toutes les heures)
export async function runForgeOffresCron(): Promise<void> {
  try {
    const n = await terminerOffresExpirees();
    if (n) console.log(`[ForgeOffresCron] ${n} offre(s) terminée(s)`);
  } catch (err) {
    console.error('[ForgeOffresCron] Échec:', err);
  }
}

export function initForgeOffresCron(): void {
  cron.schedule('15 * * * *', async () => { await runForgeOffresCron(); }, { timezone: 'America/Toronto' });
  console.log('[ForgeOffresCron] Initialisé — toutes les heures (fin des forfaits offerts par code)');
}
