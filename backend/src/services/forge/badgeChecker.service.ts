import { getSupabase } from '../../lib/supabaseClient';
export type BadgeStatut = 'verifie' | 'non_verifie' | 'grace' | 'suspendu';

export interface BadgeCheckResult {
  present: boolean;
  statut: BadgeStatut;
  message: string;
}

const BADGE_PATTERNS = [
  /noxelseo\.com/i,
  /noxel360\.com/i,
  /noxel-badge/i,
  /noxel_badge/i,
  /data-noxel/i,
  /noxel-verified/i,
];

export async function verifierBadgeSurSite(urlSite: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(urlSite, {
      signal: controller.signal,
      headers: { 'User-Agent': 'NOXEL-Forge-BadgeVerifier/1.0 (+https://noxelseo.com/forge)' },
    });
    clearTimeout(timeout);
    if (!response.ok) return false;
    const html = await response.text();
    return BADGE_PATTERNS.some((p) => p.test(html));
  } catch { return false; }
}

export async function traiterVerificationBadge(userId: string, urlSite: string): Promise<BadgeCheckResult> {
  const supabase = getSupabase();
  const badgePresent = await verifierBadgeSurSite(urlSite);
  const { data: badgeActuel, error } = await supabase.from('forge_badges').select('*').eq('user_id', userId).single();
  if (error && error.code !== 'PGRST116') console.error('[traiterVerificationBadge] Query error:', error);
  const maintenant = new Date();
  const prochaineVerif = new Date();
  prochaineVerif.setDate(prochaineVerif.getDate() + 15);

  if (badgePresent) {
    const { error: upsertError } = await supabase.from('forge_badges').upsert({
      user_id: userId, url_site: urlSite, badge_present: true,
      derniere_verification: maintenant.toISOString(), prochaine_verification: prochaineVerif.toISOString(),
      grace_expire_at: null, tentatives_echec: 0, statut: 'verifie', updated_at: maintenant.toISOString(),
    }, { onConflict: 'user_id' });
    if (upsertError) console.error('[traiterVerificationBadge] Badge upsert error:', upsertError);
    const { error: updateError } = await supabase.from('forge_members').update({ badge_installe: true, updated_at: maintenant.toISOString() }).eq('user_id', userId);
    if (updateError) console.error('[traiterVerificationBadge] Member update error:', updateError);
    return { present: true, statut: 'verifie', message: 'Badge NOXEL détecté et vérifié.' };
  }

  const tentativesEchec = (badgeActuel?.tentatives_echec ?? 0) + 1;
  const statutActuel: BadgeStatut = badgeActuel?.statut ?? 'non_verifie';

  if (statutActuel === 'verifie' || statutActuel === 'non_verifie') {
    const graceExpire = new Date();
    graceExpire.setDate(graceExpire.getDate() + 7);
    const { error: upsertError } = await supabase.from('forge_badges').upsert({
      user_id: userId, url_site: urlSite, badge_present: false,
      derniere_verification: maintenant.toISOString(), prochaine_verification: prochaineVerif.toISOString(),
      grace_expire_at: graceExpire.toISOString(), tentatives_echec: tentativesEchec, statut: 'grace', updated_at: maintenant.toISOString(),
    }, { onConflict: 'user_id' });
    if (upsertError) console.error('[traiterVerificationBadge] Grace upsert error:', upsertError);
    return { present: false, statut: 'grace', message: `Badge non détecté. Tu as 7 jours pour le réinstaller.` };
  }

  if (statutActuel === 'grace') {
    const graceExpire = badgeActuel?.grace_expire_at ? new Date(badgeActuel.grace_expire_at) : new Date();
    if (maintenant > graceExpire) {
      const { error: upsertError } = await supabase.from('forge_badges').upsert({
        user_id: userId, url_site: urlSite, badge_present: false,
        derniere_verification: maintenant.toISOString(), prochaine_verification: prochaineVerif.toISOString(),
        tentatives_echec: tentativesEchec, statut: 'suspendu', updated_at: maintenant.toISOString(),
      }, { onConflict: 'user_id' });
      if (upsertError) console.error('[traiterVerificationBadge] Suspended upsert error:', upsertError);
      const { error: memberError } = await supabase.from('forge_members').update({ badge_installe: false, statut: 'suspendu', updated_at: maintenant.toISOString() }).eq('user_id', userId);
      if (memberError) console.error('[traiterVerificationBadge] Member suspend error:', memberError);
      const { error: subError } = await supabase.from('forge_submissions').update({ backlink_noxel_actif: false, updated_at: maintenant.toISOString() }).eq('user_id', userId).eq('backlink_noxel_actif', true);
      if (subError) console.error('[traiterVerificationBadge] Submissions suspend error:', subError);
      return { present: false, statut: 'suspendu', message: 'Compte Forge suspendu — badge non réinstallé dans les délais.' };
    }
    return { present: false, statut: 'grace', message: `Badge toujours absent. Période de grâce expire le ${graceExpire.toLocaleDateString('fr-CA')}.` };
  }

  return { present: false, statut: 'suspendu', message: 'Compte suspendu. Réinstalle le badge et contacte le support.' };
}

export async function reactiverMembre(userId: string, urlSite: string): Promise<BadgeCheckResult> {
  const supabase = getSupabase();
  const badgePresent = await verifierBadgeSurSite(urlSite);
  if (!badgePresent) return { present: false, statut: 'suspendu', message: 'Badge toujours non détecté. Vérifie l\'installation.' };
  const maintenant = new Date();
  const { error: badgeError } = await supabase.from('forge_badges').update({ badge_present: true, derniere_verification: maintenant.toISOString(), grace_expire_at: null, tentatives_echec: 0, statut: 'verifie', updated_at: maintenant.toISOString() }).eq('user_id', userId);
  if (badgeError) console.error('[reactiverMembre] Badge update error:', badgeError);
  const { error: memberError } = await supabase.from('forge_members').update({ badge_installe: true, statut: 'actif', updated_at: maintenant.toISOString() }).eq('user_id', userId);
  if (memberError) console.error('[reactiverMembre] Member update error:', memberError);
  const { error: subError } = await supabase.from('forge_submissions').update({ backlink_noxel_actif: true, updated_at: maintenant.toISOString() }).eq('user_id', userId).eq('statut', 'approuve');
  if (subError) console.error('[reactiverMembre] Submissions update error:', subError);
  return { present: true, statut: 'verifie', message: 'Badge réinstallé. Compte Forge réactivé! 🔥' };
}
