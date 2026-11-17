// Codes d'accès NOXEL FORGE : création et liste (admins FORGE_ADMIN_EMAILS), échange par un membre,
// fin automatique des forfaits offerts. Table access_codes partagée avec NOXEL SEO (product = 'forge').
// Migration : noxelseo/backend/supabase/migration_2026-11-17_access_codes_modules.sql
import { getSupabase } from '../../lib/supabaseClient';
import { must } from '../../lib/supabaseCheck';
import {
  DUREES, MESSAGES_REFUS, finDans, joursAcces, normaliserCode, normaliserTier, nouveauCode, tierEffectif, verifierCode,
} from '../../lib/codesAcces';

const PRODUIT = 'forge';
const DELAI_ECHANGE_JOURS = 60; // un code non échangé après 60 jours ne vaut plus rien

export class ErreurCode extends Error {
  constructor(public status: number, message: string) { super(message); }
}

export async function creerCodes(opts: { tier: unknown; duree: unknown; nombre: unknown; note: unknown; par: string }) {
  const tier = normaliserTier(opts.tier);
  if (!tier || tier === 'bronze') throw new ErreurCode(400, 'Forfait invalide.');
  const duree = String(opts.duree ?? '');
  if (!(DUREES as readonly string[]).includes(duree)) throw new ErreurCode(400, 'Durée invalide.');
  const nombre = Math.min(20, Math.max(1, Math.floor(Number(opts.nombre) || 1)));
  const note = String(opts.note ?? '').trim().slice(0, 120);
  const expiresAt = finDans(new Date(), DELAI_ECHANGE_JOURS);
  const lignes = Array.from({ length: nombre }, () => ({
    code: nouveauCode('NXF'), tier, duration: duree, product: PRODUIT, expires_at: expiresAt,
    created_by: note ? `${opts.par} · ${note}` : opts.par,
  }));
  const { data, error } = await getSupabase().from('access_codes').insert(lignes).select('code,tier,duration,created_by,created_at,expires_at');
  if (error) {
    if (/product/.test(error.message)) throw new ErreurCode(503, 'Migration à lancer : migration_2026-11-17_access_codes_modules.sql');
    throw new ErreurCode(500, error.message);
  }
  return data ?? [];
}

export async function listerCodes() {
  const { data, error } = await getSupabase().from('access_codes')
    .select('code,tier,duration,created_by,created_at,expires_at,is_used,used_by,used_at')
    .eq('product', PRODUIT).order('created_at', { ascending: false }).limit(200);
  if (error) {
    if (/product/.test(error.message)) throw new ErreurCode(503, 'Migration à lancer : migration_2026-11-17_access_codes_modules.sql');
    throw new ErreurCode(500, error.message);
  }
  return data ?? [];
}

export async function echangerCode(userId: string, email: string, brut: unknown) {
  const code = normaliserCode(brut);
  if (!code) throw new ErreurCode(400, 'Entre ton code.');
  const sb = getSupabase();
  const ligne = must(await sb.from('access_codes').select('*').eq('code', code).maybeSingle(), 'access_codes select');
  const membre = must(await sb.from('forge_members').select('*').eq('user_id', userId).maybeSingle(), 'forge_members select');
  if (!membre) throw new ErreurCode(409, 'Inscris d’abord ton site sur NOXEL FORGE, puis entre ton code.');
  const actuel = tierEffectif({ tier: membre.tier_abonnement, tier_expires_at: membre.tier_expires_at, tier_after_expiry: membre.tier_after_expiry });
  const refus = verifierCode(ligne, PRODUIT, actuel);
  if (refus) throw new ErreurCode(refus === 'invalide' ? 404 : 400, MESSAGES_REFUS[refus]);

  const jours = joursAcces(ligne.duration);
  const maintenant = new Date();
  // Marquer le code d'abord (seulement s'il est encore libre) : deux échanges simultanés n'en valent qu'un
  const pris = must(await sb.from('access_codes').update({ is_used: true, used_by: email, used_at: maintenant.toISOString() })
    .eq('code', code).or('is_used.is.null,is_used.eq.false').select('code'), 'access_codes update');
  if (!pris?.length) throw new ErreurCode(400, MESSAGES_REFUS.deja_utilise);

  const finAt = finDans(maintenant, jours);
  const { error } = await sb.from('forge_members').update({
    tier_abonnement: ligne.tier, tier_expires_at: finAt, tier_after_expiry: finAt ? actuel : null, updated_at: maintenant.toISOString(),
  }).eq('user_id', userId);
  if (error) {
    // Rendre le code : rien n'a été donné
    await sb.from('access_codes').update({ is_used: false, used_by: null, used_at: null }).eq('code', code);
    throw new ErreurCode(503, 'Échange du code momentanément indisponible.');
  }
  return { tier: ligne.tier as string, finAt };
}

/** Remet au forfait d'avant les membres dont l'offre est terminée (lancé toutes les heures) */
export async function terminerOffresExpirees(maintenant = new Date()): Promise<number> {
  const sb = getSupabase();
  const { data, error } = await sb.from('forge_members')
    .select('user_id,tier_abonnement,tier_expires_at,tier_after_expiry')
    .not('tier_expires_at', 'is', null).lte('tier_expires_at', maintenant.toISOString());
  if (error) { if (!/tier_expires_at/.test(error.message)) console.error('[codes] lecture des offres:', error.message); return 0; }
  let n = 0;
  for (const m of data ?? []) {
    const tier = tierEffectif({ tier: m.tier_abonnement, tier_expires_at: m.tier_expires_at, tier_after_expiry: m.tier_after_expiry }, maintenant);
    const r = await sb.from('forge_members').update({ tier_abonnement: tier, tier_expires_at: null, tier_after_expiry: null, updated_at: maintenant.toISOString() })
      .eq('user_id', m.user_id).eq('tier_expires_at', m.tier_expires_at);
    if (r.error) console.error('[codes] fin d’offre', m.user_id, r.error.message); else n++;
  }
  return n;
}

/** Un abonnement payé remplace une offre en cours (appelé par le webhook Stripe ; sans effet avant la migration) */
export async function effacerOffre(filtre: { userId?: string; customerId?: string }): Promise<void> {
  // Jamais d'échec du webhook à cause d'une offre : erreur notée, paiement traité quand même
  try {
    const q = getSupabase().from('forge_members').update({ tier_expires_at: null, tier_after_expiry: null });
    const { error } = filtre.userId ? await q.eq('user_id', filtre.userId) : await q.eq('stripe_customer_id', filtre.customerId!);
    if (error && !/tier_expires_at|tier_after_expiry/.test(error.message)) console.error('[codes] effacer l’offre:', error.message);
  } catch (e) {
    console.error('[codes] effacer l’offre:', e);
  }
}
