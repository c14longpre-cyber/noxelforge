/* Select a configuration and load it BEFORE noxel-consent.js.
   No optional vendor is enabled here: declare the actual tools first (window.NOXEL_CONSENT_CONFIG in the page).
   Langue : celle de la page (<html lang>), français si absente ; le moteur affiche fr ou en.
   privacyUrl : vide tant que le site n'a pas de politique publiée (noxelforge.com, noxelspectra.com au 13/10/2026). */
window.NOXEL_CONSENT_SITES = {
  'noxelseo.com': { siteName: 'NOXEL SEO', policyVersion: 'seo-1', privacyUrl: '/privacy' },
  'noxelforge.com': { siteName: 'NOXEL Forge', policyVersion: 'forge-1', privacyUrl: '' },
  'noxel360.com': { siteName: 'NOXEL360', policyVersion: '360-1', privacyUrl: '/privacy' },
  'noxelspectra.com': { siteName: 'NOXEL Spectra', policyVersion: 'spectra-1', privacyUrl: '' },
  'app.noxelspectra.com': { siteName: 'NOXEL Spectra', policyVersion: 'spectra-app-1', privacyUrl: '' }
};
/* Sites NOXEL entre lesquels le choix est relayé par les liens (1.1.0). */
window.NOXEL_CONSENT_RELAY_DOMAINS = ['noxel360.com', 'noxelseo.com', 'noxelforge.com', 'noxelspectra.com', 'app.noxelspectra.com'];
(function () {
  const hostname = location.hostname.replace(/^www\./, '');
  const site = window.NOXEL_CONSENT_SITES[hostname] || { siteName: 'NOXEL', policyVersion: '1', privacyUrl: '' };
  window.NOXEL_CONSENT_CONFIG = Object.assign({ storageKey: 'noxel.consent.v1', retentionDays: 180, enabledCategories: [], providers: [],
    relayDomains: window.NOXEL_CONSENT_RELAY_DOMAINS, language: document.documentElement.lang || 'fr' }, site, window.NOXEL_CONSENT_CONFIG || {});
})();
