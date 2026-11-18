// ============================================================
// NOXEL Forge™ — Router Principal
// backend/src/routes/forge/forge.routes.ts
// ============================================================

import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth'; // ton middleware auth existant
import { requireAdmin } from '../../middleware/requireAdmin';
import { saisirSignauxAdmin, listerTrustScoresAdmin, recalculerTrustScoreAdmin } from '../../controllers/forge/trustScoreAdmin.controller';
import {
  registerMembre,
  getMonStatut,
  verifierMonBadge,
  recalculerMonScore,
  verifierMonDomaine,
  getMesSites,
  postAjouterSite,
  postVerifierSite,
  deleteSite,
} from '../../controllers/forge/members.controller';
import {
  creerSoumission,
  getMesSoumissions,
  getAnnuaire,
} from '../../controllers/forge/submissions.controller';
import { getSuggestions } from '../../controllers/forge/matchmaking.controller';
import { adminCreerCodes, adminListerCodes, echanger } from '../../controllers/forge/codesAcces.controller';
import { listerEchanges, proposer, accepter, refuser, declarer } from '../../controllers/forge/exchanges.controller';

const router = Router();

// ============================================================
// MEMBRES
// ============================================================

// Inscription Forge (Silver+ only)
router.post('/members/register', requireAuth, registerMembre);

// Statut complet du membre connecté
router.get('/members/status', requireAuth, getMonStatut);

// Preuve de propriété du domaine (balise meta, fichier .well-known ou DNS TXT)
router.post('/members/domain/verify', requireAuth, verifierMonDomaine);

// Plusieurs sites par compte (limite selon le forfait)
router.get('/sites', requireAuth, getMesSites);
router.post('/sites', requireAuth, postAjouterSite);
router.post('/sites/verify', requireAuth, postVerifierSite);
router.delete('/sites/:domaine', requireAuth, deleteSite);

// ============================================================
// BADGES
// ============================================================

// Vérifier badge manuellement après installation
router.post('/badges/verify', requireAuth, verifierMonBadge);

// ============================================================
// TRUST SCORE
// ============================================================

// Recalcul Trust Score côté serveur : le corps de la requête est ignoré, chaque signal vient d'une
// source serveur (NOXEL SEO, RDAP, sitemap/RSS, Alfred, saisie admin). Voir trustScoreServeur.ts.
router.post('/trust-score/recalculate', requireAuth, recalculerMonScore);

// Saisie admin de l'autorité et du spam (FORGE_ADMIN_EMAILS)
router.get('/admin/trust-scores', requireAuth, requireAdmin, listerTrustScoresAdmin);
router.post('/admin/trust-score/:userId', requireAuth, requireAdmin, saisirSignauxAdmin);
router.post('/admin/trust-score/:userId/recalculate', requireAuth, requireAdmin, recalculerTrustScoreAdmin);

// Codes d'accès (table access_codes partagée, product = 'forge')
router.get('/admin/codes', requireAuth, requireAdmin, adminListerCodes);
router.post('/admin/codes', requireAuth, requireAdmin, adminCreerCodes);
router.post('/codes/redeem', requireAuth, echanger);

// ============================================================
// MATCHMAKING
// ============================================================

// Suggestions de partenaires (scoring pondéré niche + trust score + activité)
router.get('/matchmaking/suggestions', requireAuth, getSuggestions);

// ============================================================
// ÉCHANGES DE BACKLINKS (propose -> accepte -> publie -> verifie)
// ============================================================

router.get('/exchanges', requireAuth, listerEchanges);
router.post('/exchanges', requireAuth, proposer);
router.post('/exchanges/:id/accepter', requireAuth, accepter);
router.post('/exchanges/:id/refuser', requireAuth, refuser);
router.post('/exchanges/:id/lien', requireAuth, declarer);

// ============================================================
// SOUMISSIONS
// ============================================================

// Soumettre un contenu
router.post('/submissions', requireAuth, creerSoumission);

// Mes soumissions
router.get('/submissions', requireAuth, getMesSoumissions);

// Annuaire public (pas d'auth requise)
router.get('/submissions/annuaire', getAnnuaire);

export default router;
