import { recupererTexte } from './http';
import type { FetchFn, SignalCollecte } from './types';

// Domain age from RDAP (structured registry data, no raw WHOIS). rdap.org redirects to the
// registry that serves the TLD. Value: age in years, from the "registration" event.
export const RDAP_BASE = 'https://rdap.org/domain/';
const AN_MS = 365.25 * 24 * 60 * 60 * 1000;

// "blog.exemple.ca" -> ["blog.exemple.ca", "exemple.ca"]: RDAP only knows the registered domain
export function candidatsRdap(domaine: string): string[] {
  const labels = domaine.split('.');
  const out: string[] = [];
  for (let i = 0; i <= labels.length - 2; i++) out.push(labels.slice(i).join('.'));
  return out;
}

export function dateEnregistrement(rdap: any): Date | null {
  const events: any[] = Array.isArray(rdap?.events) ? rdap.events : [];
  const ev = events.find((e) => String(e?.eventAction).toLowerCase() === 'registration');
  const t = ev ? Date.parse(ev.eventDate) : NaN;
  return Number.isNaN(t) ? null : new Date(t);
}

export async function collecterAgeDomaine(
  domaine: string, { fetchImpl = fetch, now = () => new Date() }: { fetchImpl?: FetchFn; now?: () => Date } = {},
): Promise<SignalCollecte> {
  const collecte_at = now().toISOString();
  const echec = (raison: string): SignalCollecte => ({ valeur: null, source: 'rdap', collecte_at, raison });
  let derniereRaison = 'Domaine inconnu du registre RDAP';

  for (const candidat of candidatsRdap(domaine)) {
    const r = await recupererTexte(RDAP_BASE + encodeURIComponent(candidat), fetchImpl, { Accept: 'application/rdap+json' });
    if (!r.ok) {
      if (r.status === 404) continue; // subdomain unknown: try the parent domain
      derniereRaison = `RDAP ${r.raison}`;
      break;
    }
    let json: any;
    try { json = JSON.parse(r.texte); } catch { return echec('Réponse RDAP illisible'); }
    const date = dateEnregistrement(json);
    if (!date) return echec('Aucune date d\'enregistrement dans la réponse RDAP');
    const annees = Math.max(0, (now().getTime() - date.getTime()) / AN_MS);
    return { valeur: Math.round(annees * 100) / 100, source: 'rdap', collecte_at };
  }
  return echec(derniereRaison);
}
