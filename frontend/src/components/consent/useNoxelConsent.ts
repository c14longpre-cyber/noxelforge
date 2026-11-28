import { useEffect, useState } from 'react';
import type { ConsentCategory, ConsentReceipt } from './NoxelConsentButton';

/** Never import/initialize a tracker unconditionally at the top of a module. */
export function useNoxelConsent() {
  const [receipt, setReceipt] = useState<ConsentReceipt | null>(() => window.NoxelConsent?.getReceipt() || null);
  useEffect(() => {
    const refresh = () => setReceipt(window.NoxelConsent?.getReceipt() || null);
    window.addEventListener('noxel:consentready', refresh);
    window.addEventListener('noxel:consentchange', refresh);
    refresh();
    return () => {
      window.removeEventListener('noxel:consentready', refresh);
      window.removeEventListener('noxel:consentchange', refresh);
    };
  }, []);
  return {
    receipt,
    // Check current engine state for every operation, not only this render's snapshot.
    isAllowed: (category: ConsentCategory) => window.NoxelConsent?.has(category) === true,
    open: () => window.NoxelConsent?.open()
  };
}
