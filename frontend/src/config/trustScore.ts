// The six Trust Score signals are not computed by the server yet: stored scores were entered by hand.
// Until VITE_TRUST_SCORE_SERVER_COMPUTED=true (same switch as TRUST_SCORE_SERVER_COMPUTED on the API),
// no figure, signal or score-based tier is shown, only a "being calculated" state.
export const TRUST_SCORE_SERVER_COMPUTED = import.meta.env.VITE_TRUST_SCORE_SERVER_COMPUTED === 'true';

export const TRUST_SCORE_PENDING_LABEL = 'Being calculated';
export const TRUST_SCORE_PENDING_MESSAGE = 'Your Trust Score is being calculated by NOXEL.';

// Server score computed but still waiting for the admin entry of authority and spam (statut 'en_attente')
export const TRUST_SCORE_VERIFYING_LABEL = 'Awaiting verification';
export const TRUST_SCORE_VERIFYING_MESSAGE = 'NOXEL is verifying your authority and spam signals.';
export const trustScoreAwaitingVerification = (ts: { statut?: string; score?: number | null } | null | undefined) =>
  !ts || ts.statut === 'en_attente' || typeof ts.score !== 'number';
