// NOXEL Forge — proof that a member owns the site they registered (decision of 2026-10-27, audit).
// Without it, anyone could register another member's domain, take its public Trust Score and appear
// under that domain in the matchmaking. A member's domain is public (matchmaking, directory, public Trust
// Score, exchanges) only once proven, and only one member can hold a proven domain.
// Three ways to prove it, any one is enough:
//   1. <meta name="noxel-forge-verification" content="TOKEN"> on the home page
//   2. the file https://<domain>/.well-known/noxel-forge-verification.txt containing TOKEN
//   3. a DNS TXT record "noxel-forge-verification=TOKEN" on the domain
import dns from 'dns/promises';
import { signerValeur } from '../session';
import { recupererTexte } from './signals/http';
import type { FetchFn } from './signals/types';

export const META_NAME = 'noxel-forge-verification';
export const FICHIER = '/.well-known/noxel-forge-verification.txt';

export function jetonDomaine(userId: string, domaine: string): string {
  return 'nxf-' + signerValeur(`domain:${userId}:${domaine}`);
}

export function instructions(domaine: string, jeton: string) {
  return {
    meta: `<meta name="${META_NAME}" content="${jeton}">`,
    fichier: { url: `https://${domaine}${FICHIER}`, contenu: jeton },
    dns: { nom: domaine, valeur: `${META_NAME}=${jeton}` },
  };
}

// True when the page has <meta name="noxel-forge-verification" content="TOKEN"> (attributes in any order)
export function metaContientJeton(html: string, jeton: string): boolean {
  for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = m[0];
    const name = /\bname\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1];
    const content = /\bcontent\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1];
    if (name?.trim().toLowerCase() === META_NAME && content?.trim() === jeton) return true;
  }
  return false;
}

export interface DepsPropriete {
  fetchImpl?: FetchFn;
  resolveTxt?: (domaine: string) => Promise<string[][]>;
}

export async function verifierPropriete(domaine: string, jeton: string, deps: DepsPropriete = {}):
  Promise<{ ok: true; methode: 'meta' | 'fichier' | 'dns' } | { ok: false; raison: string }> {
  const raisons: string[] = [];

  for (const hote of [domaine, `www.${domaine}`]) {
    const page = await recupererTexte(`https://${hote}/`, deps.fetchImpl);
    if (page.ok && metaContientJeton(page.texte, jeton)) return { ok: true, methode: 'meta' };
    if (hote === domaine) raisons.push(page.ok ? 'balise meta absente de la page d’accueil' : `page d’accueil ${page.raison}`);
  }

  const fichier = await recupererTexte(`https://${domaine}${FICHIER}`, deps.fetchImpl);
  if (fichier.ok && fichier.texte.trim().split(/\s+/)[0] === jeton) return { ok: true, methode: 'fichier' };
  raisons.push(fichier.ok ? 'fichier présent mais jeton différent' : `fichier ${fichier.raison}`);

  try {
    const enregistrements = await (deps.resolveTxt ?? dns.resolveTxt)(domaine);
    if (enregistrements.some((parts) => parts.join('').trim() === `${META_NAME}=${jeton}`)) return { ok: true, methode: 'dns' };
    raisons.push('enregistrement DNS TXT absent');
  } catch {
    raisons.push('enregistrement DNS TXT absent');
  }
  return { ok: false, raison: raisons.join(' ; ') };
}
