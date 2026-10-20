import cron from 'node-cron';
import { runExchangeCron } from '../services/forge/exchanges.service';

// Daily, 10:00 Toronto (after the badge cron): expirations, verification of declared links,
// re-check of verified exchanges (7-day grace, then 'rompu'). Never runs at startup.
export function initForgeExchangeCron(): void {
  cron.schedule('0 10 * * *', async () => {
    try {
      const bilan = await runExchangeCron();
      console.log('[ExchangeCron]', JSON.stringify(bilan));
    } catch (err: any) {
      console.error('[ExchangeCron] run failed:', err?.message ?? err);
    }
  }, { timezone: 'America/Toronto' });
  console.log('[ExchangeCron] Initialisé — chaque jour à 10h00 (Toronto)');
}
