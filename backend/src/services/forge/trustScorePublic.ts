// Public, read-only view of a stored Trust Score (GET /api/trust-score/:domain, used by the NOXEL MCP).
// Pure helpers only (no Supabase import): unit-tested directly by node --test.

export const SIGNAL_MAX = {
  technical: 25,
  authority: 25,
  spam: 20,
  content: 15,
  age: 10,
  frequency: 5,
} as const;

export type SignalName = keyof typeof SIGNAL_MAX;
export type Signals = Record<SignalName, number | null>;

// Column names in forge_trust_scores (see trustScore.service.ts)
const COLUMN_OF: Record<SignalName, string> = {
  technical: 'signal_technique',
  authority: 'signal_autorite',
  spam: 'signal_spam',
  content: 'signal_contenu',
  age: 'signal_anciennete',
  frequency: 'signal_frequence',
};

// "HTTPS://www.Exemple.ca/page?x" -> "exemple.ca"; null if it is not a domain name
export function normaliserDomaine(input: unknown): string | null {
  if (typeof input !== 'string') return null;
  const brut = input.trim().toLowerCase();
  if (!brut) return null;
  let host: string;
  try {
    host = new URL(brut.includes('://') ? brut : `https://${brut}`).hostname;
  } catch {
    return null;
  }
  host = host.replace(/\.$/, '').replace(/^www\./, '');
  return /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(host) ? host : null;
}

const asNumber = (v: unknown): number | null =>
  typeof v === 'number' && Number.isFinite(v) ? v : null;

// Lowest score/max ratio among the signals actually stored; null if none is
export function signalLePlusFaible(signals: Signals): SignalName | null {
  let weakest: SignalName | null = null;
  let lowest = Infinity;
  for (const name of Object.keys(SIGNAL_MAX) as SignalName[]) {
    const v = signals[name];
    if (v === null) continue;
    const ratio = v / SIGNAL_MAX[name];
    if (ratio < lowest) {
      lowest = ratio;
      weakest = name;
    }
  }
  return weakest;
}

// Only score fields are read from the row: no user_id, tier or details ever leave this function
export function construireReponseTrouvee(domain: string, row: Record<string, unknown>) {
  const signals = {} as Signals;
  for (const name of Object.keys(SIGNAL_MAX) as SignalName[]) signals[name] = asNumber(row[COLUMN_OF[name]]);
  const computedAt = typeof row.calcule_at === 'string' && !Number.isNaN(Date.parse(row.calcule_at))
    ? new Date(row.calcule_at).toISOString()
    : null;
  return {
    ok: true as const,
    found: true as const,
    domain,
    trust_score: asNumber(row.score),
    signals,
    max: { ...SIGNAL_MAX },
    weakest: signalLePlusFaible(signals),
    computedAt,
  };
}

export const reponseNonTrouvee = (domain: string) => ({ ok: true as const, found: false as const, domain });

// Scores stored before the server computation were entered by hand: no figure is published until
// TRUST_SCORE_SERVER_COMPUTED=true (set it once the migration has run and scores were recomputed by the server).
export function scoreServeurActif(env: Record<string, string | undefined> = process.env): boolean {
  return env.TRUST_SCORE_SERVER_COMPUTED === 'true';
}

export const MESSAGE_SCORE_EN_ATTENTE = 'Trust Score en cours de calcul par NOXEL.';

// Score computed by the server but still waiting for the admin entry of authority and spam
export const MESSAGE_SCORE_A_VERIFIER = 'Trust Score en attente de vérification par NOXEL.';

export const reponseEnAttente = (domain: string, message: string = MESSAGE_SCORE_EN_ATTENTE) => ({
  ok: true as const,
  found: true as const,
  domain,
  status: 'pending' as const,
  trust_score: null,
  signals: null,
  max: { ...SIGNAL_MAX },
  weakest: null,
  computedAt: null,
  message,
});

// Minimal shape of the Supabase client used here (injected, so tests can pass a fake one)
type QueryResult = PromiseLike<{ data: any[] | null; error: { message: string } | null }>;
interface Query extends QueryResult {
  eq(col: string, v: unknown): Query;
  ilike(col: string, pattern: string): Query;
  in(col: string, values: unknown[]): Query;
  order(col: string, opts?: { ascending?: boolean; nullsFirst?: boolean }): Query;
  limit(n: number): Query;
}
export interface TrustScoreDb { from(table: string): { select(cols: string): Query } }

export class ErreurSupabase extends Error {
  table: string;
  constructor(table: string, message: string) {
    super(`${table}: ${message}`);
    this.table = table;
  }
}

// READ ONLY: last stored score of an active member whose badge is verified ("public").
// Anyone else (unknown domain, suspended member, badge not verified, no score) gets found:false.
export async function chercherTrustScorePublic(
  db: TrustScoreDb, domain: string, { serverComputed = scoreServeurActif() }: { serverComputed?: boolean } = {},
) {
  // url_site is stored as entered (protocol, www, path…): narrow with ilike, then compare normalized.
  // domain is normalized to [a-z0-9.-], so it cannot carry ilike wildcards.
  const membres = await db.from('forge_members').select('user_id,url_site')
    .eq('statut', 'actif').ilike('url_site', `%${domain}%`);
  if (membres.error) throw new ErreurSupabase('forge_members', membres.error.message);

  const userIds = (membres.data ?? [])
    .filter((m) => normaliserDomaine(m.url_site) === domain)
    .map((m) => m.user_id);
  if (!userIds.length) return reponseNonTrouvee(domain);

  const badges = await db.from('forge_badges').select('user_id')
    .in('user_id', userIds).eq('statut', 'verifie');
  if (badges.error) throw new ErreurSupabase('forge_badges', badges.error.message);

  const publics = (badges.data ?? []).map((b) => b.user_id);
  if (!publics.length) return reponseNonTrouvee(domain);

  // Until the server computes the score, a public member is reported as pending: the stored figure is not read
  if (!serverComputed) return reponseEnAttente(domain);

  // Explicit column list: user_id, tier_forge and details are never read
  const scores = await db.from('forge_trust_scores')
    .select('statut,score,signal_technique,signal_autorite,signal_spam,signal_contenu,signal_anciennete,signal_frequence,calcule_at')
    .in('user_id', publics)
    .order('calcule_at', { ascending: false, nullsFirst: false })
    .limit(1);
  if (scores.error) throw new ErreurSupabase('forge_trust_scores', scores.error.message);

  const row = scores.data?.[0];
  if (!row) return reponseNonTrouvee(domain);
  if (row.statut === 'en_attente' || typeof row.score !== 'number') return reponseEnAttente(domain, MESSAGE_SCORE_A_VERIFIER);
  return construireReponseTrouvee(domain, row);
}
