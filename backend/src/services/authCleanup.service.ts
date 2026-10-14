import { getSupabase } from '../lib/supabaseClient';

// Délais de grâce après expiration avant suppression définitive.
export const GRACE_LIENS_MAGIQUES_MS = 24 * 60 * 60 * 1000; // 1 jour (liens valides 15 min)
export const GRACE_DEFIS_PASSKEY_MS = 60 * 60 * 1000;      // 1 heure (défis valides 5 min)

export interface ResultatPurgeAuth {
  liensMagiquesSupprimes: number | null;
  defisPasskeySupprimes: number | null;
  erreurs: string[];
}

/**
 * Supprime les lignes d'authentification expirées (elles contiennent des courriels) :
 * - magic_links expirés depuis plus d'un jour (utilisés ou non) ;
 * - passkey_challenges expirés depuis plus d'une heure.
 * Le client Supabase renvoie { error } au lieu de lever une exception : chaque erreur est vérifiée et journalisée.
 */
export async function purgerDonneesAuthExpirees(supabase = getSupabase(), maintenant = new Date()): Promise<ResultatPurgeAuth> {
  const resultat: ResultatPurgeAuth = { liensMagiquesSupprimes: null, defisPasskeySupprimes: null, erreurs: [] };

  const limiteLiens = new Date(maintenant.getTime() - GRACE_LIENS_MAGIQUES_MS).toISOString();
  const liens = await supabase.from('magic_links').delete({ count: 'exact' }).lt('expires_at', limiteLiens);
  if (liens.error) {
    console.error('[AuthCleanup] Erreur purge magic_links:', liens.error);
    resultat.erreurs.push('magic_links: ' + liens.error.message);
  } else {
    resultat.liensMagiquesSupprimes = liens.count ?? 0;
  }

  const limiteDefis = new Date(maintenant.getTime() - GRACE_DEFIS_PASSKEY_MS).toISOString();
  const defis = await supabase.from('passkey_challenges').delete({ count: 'exact' }).lt('expires_at', limiteDefis);
  if (defis.error) {
    console.error('[AuthCleanup] Erreur purge passkey_challenges:', defis.error);
    resultat.erreurs.push('passkey_challenges: ' + defis.error.message);
  } else {
    resultat.defisPasskeySupprimes = defis.count ?? 0;
  }

  console.log(`[AuthCleanup] magic_links supprimés: ${resultat.liensMagiquesSupprimes ?? 'erreur'} — passkey_challenges supprimés: ${resultat.defisPasskeySupprimes ?? 'erreur'}`);
  return resultat;
}
