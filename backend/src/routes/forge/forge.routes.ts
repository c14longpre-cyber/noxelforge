// ============================================================
// NOXEL Forge™ — Router Principal
// backend/src/routes/forge/forge.routes.ts
// ============================================================

import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth'; // ton middleware auth existant
import {
  registerMembre,
  getMonStatut,
  verifierMonBadge,
  recalculerMonScore,
} from '../../controllers/forge/members.controller';
import {
  creerSoumission,
  getMesSoumissions,
  getAnnuaire,
} from '../../controllers/forge/submissions.controller';

const router = Router();

// ============================================================
// MEMBRES
// ============================================================

// Inscription Forge (Silver+ only)
router.post('/members/register', requireAuth, registerMembre);

// Statut complet du membre connecté
router.get('/members/status', requireAuth, getMonStatut);

// ============================================================
// BADGES
// ============================================================

// Vérifier badge manuellement après installation
router.post('/badges/verify', requireAuth, verifierMonBadge);

// ============================================================
// TRUST SCORE
// ============================================================

// Recalcul Trust Score après scan NOXEL SEO
router.post('/trust-score/recalculate', requireAuth, recalculerMonScore);

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
