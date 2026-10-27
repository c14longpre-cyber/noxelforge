import { recupererTexte } from './http';
import type { FetchFn, SignalCollecte } from './types';
import { fetchSur } from '../../../lib/safeFetch';

// Publication frequency: dates found in sitemap.xml (<lastmod>), or else in an RSS/Atom feed.
// Value: pages or posts dated in the last 90 days, per month.
export const FENETRE_JOURS = 90;
const JOUR_MS = 24 * 60 * 60 * 1000;
const MAX_SOUS_SITEMAPS = 5;
export const CHEMINS_FLUX = ['/feed', '/rss.xml', '/feed.xml', '/atom.xml', '/index.xml', '/rss'];

function dates(xml: string, re: RegExp): Date[] {
  const out: Date[] = [];
  for (const m of xml.matchAll(re)) {
    const t = Date.parse(m[1].trim());
    if (!Number.isNaN(t)) out.push(new Date(t));
  }
  return out;
}

export const extraireLastmods = (xml: string) => dates(xml, /<lastmod>\s*([^<]+?)\s*<\/lastmod>/gi);

// RSS <pubDate>, Atom <published>; Atom <updated> only inside <entry> (the feed's own <updated> is not a post)
export function extraireDatesFlux(xml: string): Date[] {
  const pub = [...dates(xml, /<pubDate>\s*([^<]+?)\s*<\/pubDate>/gi), ...dates(xml, /<published>\s*([^<]+?)\s*<\/published>/gi)];
  if (pub.length) return pub;
  const entries = [...xml.matchAll(/<entry[\s>][\s\S]*?<\/entry>/gi)].map((m) => m[0]).join('\n');
  return dates(entries, /<updated>\s*([^<]+?)\s*<\/updated>/gi);
}

// Child sitemaps of a sitemap index, kept only on the member's own host
export function extraireSousSitemaps(xml: string, domaine: string): string[] {
  if (!/<sitemapindex[\s>]/i.test(xml)) return [];
  const hotes = new Set([domaine, `www.${domaine}`]);
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)]
    .map((m) => m[1].trim())
    .filter((u) => { try { return hotes.has(new URL(u).hostname.toLowerCase()); } catch { return false; } })
    .slice(0, MAX_SOUS_SITEMAPS);
}

export function publicationsParMois(liste: Date[], now: Date): number {
  const debut = now.getTime() - FENETRE_JOURS * JOUR_MS;
  const recentes = liste.filter((d) => d.getTime() >= debut && d.getTime() <= now.getTime() + JOUR_MS).length;
  return Math.round((recentes / (FENETRE_JOURS / 30)) * 100) / 100;
}

export async function collecterFrequence(
  domaine: string, { fetchImpl = fetchSur, now = () => new Date() }: { fetchImpl?: FetchFn; now?: () => Date } = {},
): Promise<SignalCollecte> {
  const maintenant = now();
  const collecte_at = maintenant.toISOString();
  const base = `https://${domaine}`;

  // 1. sitemap.xml (and up to 5 child sitemaps of an index)
  const sitemap = await recupererTexte(`${base}/sitemap.xml`, fetchImpl);
  let raisonSitemap = sitemap.ok ? 'sitemap.xml sans date <lastmod>' : `sitemap.xml ${sitemap.raison}`;
  if (sitemap.ok) {
    let lastmods = extraireLastmods(sitemap.texte);
    for (const url of extraireSousSitemaps(sitemap.texte, domaine)) {
      const sous = await recupererTexte(url, fetchImpl);
      if (sous.ok) lastmods = lastmods.concat(extraireLastmods(sous.texte));
    }
    if (lastmods.length) return { valeur: publicationsParMois(lastmods, maintenant), source: 'sitemap', collecte_at };
  }

  // 2. RSS / Atom feed as a fallback
  for (const chemin of CHEMINS_FLUX) {
    const flux = await recupererTexte(`${base}${chemin}`, fetchImpl);
    if (!flux.ok || !/<(rss|feed|rdf:RDF)[\s>]/i.test(flux.texte)) continue;
    const liste = extraireDatesFlux(flux.texte);
    if (liste.length) return { valeur: publicationsParMois(liste, maintenant), source: 'rss', collecte_at };
  }

  return { valeur: null, source: 'sitemap', collecte_at, raison: `${raisonSitemap} ; aucun flux RSS/Atom daté` };
}
