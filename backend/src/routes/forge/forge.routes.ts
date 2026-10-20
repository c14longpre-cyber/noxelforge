// ============================================================
// NOXEL Forge™ — Router Principal
// backend/src/routes/forge/forge.routes.ts
// ============================================================

import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth'; // ton middleware auth existant
import { requireAdmin } from '../../middleware/requireAdmin';
import { saisirSignauxAdmin } from '../../controllers/forge/trustScoreAdmin.controller';
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
import { getSuggestions } from '../../controllers/forge/matchmaking.controller';

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

// Recalcul Trust Score côté serveur : le corps de la requête est ignoré, chaque signal vient d'une
// source serveur (NOXEL SEO, RDAP, sitemap/RSS, Alfred, saisie admin). Voir trustScoreServeur.ts.
router.post('/trust-score/recalculate', requireAuth, recalculerMonScore);

// Saisie admin de l'autorité et du spam (FORGE_ADMIN_EMAILS)
router.post('/admin/trust-score/:userId', requireAuth, requireAdmin, saisirSignauxAdmin);

// ============================================================
// MATCHMAKING
// ============================================================

// Suggestions de partenaires (scoring pondéré niche + trust score + activité)
router.get('/matchmaking/suggestions', requireAuth, getSuggestions);

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
