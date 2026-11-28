import { Analytics } from '@vercel/analytics/react'
import { useNoxelConsent } from './useNoxelConsent'

/** Vercel Web Analytics seulement après consentement « mesure d’audience » (NOXEL Consent). */
export function ConsentedAnalytics() {
  const { receipt, isAllowed } = useNoxelConsent()
  return receipt && isAllowed('analytics') ? <Analytics /> : null
}
