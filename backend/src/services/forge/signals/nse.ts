import { recupererTexte } from './http';
import type { FetchFn, SignalCollecte } from './types';

// Technical signal from NOXEL SEO: GET full-scan (same route as the MCP tool noxel_scan_site).
// Value: scores.tech (0-100). The signal is dated by the scan itself (scannedAt); a scan older than
// 30 days, an unfinished scan or a missing/out-of-range score is refused: value null with a reason.
export const NSE_FULL_SCAN_URL_DEFAUT = 'https://api.noxelseo.com/api/seo/full-scan';
export const DELAI_SCAN_MS = 90_000; // a full scan runs PageSpeed: much slower than a page fetch
const SCAN_MAX_JOURS = 30;
const JOUR_MS = 24 * 60 * 60 * 1000;

export function urlFullScan(domaine: string, base: string = process.env.NSE_FULL_SCAN_URL || NSE_FULL_SCAN_URL_DEFAUT): string {
  return `${base}?url=${encodeURIComponent(`https://${domaine}/`)}`;
}

// Reads the technical sub-score from a full-scan answer; throws with a reason when it is not usable
export function lireScoreTechnique(json: any, now: Date): { tech: number; scannedAt: string } {
  if (!json || json.ok !== true) throw new Error(`réponse en échec${json?.error ? ` (${json.error})` : ''}`);
  if (json.status !== 'done') throw new Error(`scan non terminé (status: ${json.status ?? 'absent'})`);
  const tech = json.scores?.tech;
  if (typeof tech !== 'number' || !Number.isFinite(tech) || tech < 0 || tech > 100) throw new Error(`scores.tech invalide (${JSON.stringify(tech)})`);
  const t = Date.parse(json.scannedAt);
  if (Number.isNaN(t)) throw new Error('date du scan (scannedAt) absente');
  if (now.getTime() - t > SCAN_MAX_JOURS * JOUR_MS) throw new Error(`scan trop ancien (${new Date(t).toISOString().slice(0, 10)})`);
  return { tech: Math.round(tech), scannedAt: new Date(t).toISOString() };
}

export async function collecterTechniqueNse(
  domaine: string, { fetchImpl = fetch, now = () => new Date() }: { fetchImpl?: FetchFn; now?: () => Date } = {},
): Promise<SignalCollecte> {
  const maintenant = now();
  const echec = (raison: string): SignalCollecte => ({ valeur: null, source: 'nse', collecte_at: maintenant.toISOString(), raison });
  const r = await recupererTexte(urlFullScan(domaine), fetchImpl, { Accept: 'application/json' }, DELAI_SCAN_MS);
  if (!r.ok) return echec(`NOXEL SEO ${r.raison}`);
  let json: unknown;
  try { json = JSON.parse(r.texte); } catch { return echec('Réponse NOXEL SEO illisible'); }
  try {
    const { tech, scannedAt } = lireScoreTechnique(json, maintenant);
    return { valeur: tech, source: 'nse', collecte_at: scannedAt };
  } catch (err: any) {
    return echec(`NOXEL SEO : ${err.message}`);
  }
}
