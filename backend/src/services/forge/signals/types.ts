// One Trust Score signal as collected by the server: the raw value, where it came from and when.
// valeur is null when the source failed or has nothing yet; raison then says why (the signal counts 0).

export type NomSignal = 'technique' | 'autorite' | 'spam' | 'contenu' | 'anciennete' | 'frequence';

export type SourceSignal = 'nse' | 'rdap' | 'sitemap' | 'rss' | 'admin' | 'alfred';

export interface SignalCollecte {
  valeur: number | null;
  source: SourceSignal;
  collecte_at: string;
  raison?: string;
  saisi_par?: string; // admin entries only: e-mail of the admin who typed the value
}

export type SourcesSignaux = Partial<Record<NomSignal, SignalCollecte>>;

export type FetchFn = typeof fetch;
