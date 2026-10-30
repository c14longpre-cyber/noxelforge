import type { FetchFn } from './types';
import { fetchSur } from '../../../lib/safeFetch';

// Every collector fetches pages chosen by the member (their own site): bounded time and size.
export const DELAI_MS = 8000;
export const TAILLE_MAX = 2_000_000;
const USER_AGENT = 'NOXEL-Forge-TrustScore/1.0 (+https://noxelforge.com)';

export type ResultatFetch =
  | { ok: true; status: number; texte: string }
  | { ok: false; status?: number; raison: string };

export async function recupererTexte(
  url: string, fetchImpl: FetchFn = fetchSur, headers: Record<string, string> = {}, delaiMs: number = DELAI_MS,
): Promise<ResultatFetch> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), delaiMs);
  try {
    const res = await fetchImpl(url, { signal: controller.signal, redirect: 'follow', headers: { 'User-Agent': USER_AGENT, ...headers } });
    if (!res.ok) return { ok: false, status: res.status, raison: `HTTP ${res.status}` };
    const longueur = Number(res.headers.get('content-length') ?? 0);
    if (longueur > TAILLE_MAX) return { ok: false, status: res.status, raison: `Réponse trop grande (${longueur} octets)` };
    const texte = (await res.text()).slice(0, TAILLE_MAX);
    return { ok: true, status: res.status, texte };
  } catch (err: any) {
    return { ok: false, raison: err?.name === 'AbortError' ? `Délai dépassé (${delaiMs / 1000} s)` : `Inaccessible (${err?.message ?? err})` };
  } finally {
    clearTimeout(timer);
  }
}
