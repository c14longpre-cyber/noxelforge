# NOXEL FORGE — Claude Code Agents

Backlink exchange & matchmaking SaaS (Trust Score Forge). This file enables specialized agents to review, test, and fix the entire codebase.

## Project Structure

```
noxelforge/
├── backend/                    Node.js + Express + TypeScript on Railway (api.noxelforge.com)
│   ├── src/
│   │   ├── services/forge/     Matchmaking, trustScore, badgeChecker, alfred (AI reviewer), stripe
│   │   ├── controllers/forge/  Submissions, members, matchmaking endpoints
│   │   ├── routes/forge/       Forge routes (matchmaking, stripe)
│   │   ├── routes/auth.*       OAuth flows (GitHub, Microsoft, LinkedIn, Magic Link, Passkeys, Email)
│   │   ├── cron/               forgeBadgeCron (daily 9AM Toronto: all members on the 1st/15th, members in grace the other days; 7-day grace)
│   │   ├── middleware/         requireAuth (all endpoints auth-gated)
│   │   ├── lib/                supabaseClient.ts
│   │   └── services/           emailService, session, userStore
│   └── package.json           Dependencies (Express, Stripe, Supabase, Anthropic SDK)
│
└── frontend/                   React + Vite + TypeScript on Vercel (noxelforge.com)
    ├── src/
    │   ├── App.tsx            Main dashboard + routing
    │   ├── pages/             Forge pages (ForgePartners, ForgeSubmissions, ForgeDashboard)
    │   ├── components/        ForgeAccessModal, NoxelInterface, PasskeyButton
    │   ├── auth/              AuthStore (GitHub, Microsoft, LinkedIn, Magic, Passkeys, Email/Password)
    │   ├── hooks/             useForgeT (tier data hook)
    │   ├── api/               API client (rest calls to backend)
    │   └── config/            Pricing tiers (Bronze/Silver/Gold/Platinum/Diamond)
    │
    └── public/
        ├── index.html         Main entry (Vite)
        ├── assets/            NOXEL branding, tier badges
        └── locales/           i18n translations
```

## Critical Rules & Non-Negotiables

### 1. Trust Score Integrity
- **6-signal scoring model**: Technical (25), Authority (25), Spam (20), Content (15), Age (10), Frequency (5) = /100
- **Score source**: `trustScore.service.ts` is single source of truth; no hardcoding elsewhere
- **Signal weights immutable**: Each signal's weight never changes mid-calculation
- **Score validation**: All scores must be ∈ [0, 100]; reject or clamp out-of-bounds values
- **Server-side signals** (`trustScoreServeur.ts`): the member never sends a signal value. Technical → NOXEL SEO full-scan (not wired yet: counts 0 with a reason); Age → RDAP; Frequency → sitemap.xml, else RSS/Atom; Content → Alfred; Authority & Spam → admin entry (`POST /api/forge/admin/trust-score/:userId`, admins listed in `FORGE_ADMIN_EMAILS`). Each signal stores its source, date and failure reason in `forge_trust_scores.signaux_sources`; collected values are cached 30 days. Without both admin values the score is `en_attente` (shown as "awaiting verification", never 0). Silver starts at 40.
- **Alfred AI reviewer**: Uses claude-sonnet-4-6; autonomous validation of submissions per Trust Score Forge rules

### 2. Tier & Pricing Integrity
- **5 tiers**: Bronze (free, limited submissions), Silver ($20/mo), Gold ($40/mo), Platinum ($60/mo), Diamond ($80/mo)
- **Submission caps**: Tier-dependent daily/monthly limits in badge.routes or submission controller
- **Pricing discounts**: 17% annual discount, 20% loyalty discount (configurable in Stripe Dashboard)
- **Refund policy**: 14-day no-questions-asked (legal requirement, not negotiable)
- **Payment flow**: Stripe integration via stripe.forge.service.ts + stripe.forge.routes.ts

### 3. Badge System (Forge-Specific)
- **Badge lifecycle**: 
  1. User registers/verifies domain → badge.routes issues provisional badge
  2. Cron job (daily 9AM Toronto; full check on the 1st/15th, grace members every day) triggers badgeChecker → Alfred review → Trust Score update
  3. 7-day grace period after Alfred approval before public publication
- **Anti-spoofing**: Domain ownership verification required before badge issuance
- **Badge cron**: forgeBadgeCron.ts runs daily (full check on the 1st/15th, grace members the other days); failure = alert user, no auto-retry
- **Badge revocation**: Blacklist system for spam/abuse (via spamGate.service.ts)

### 4. Matchmaking Engine
- **Algorithm inputs**:
  - Niche proximity (content categories must overlap)
  - Trust Score difference (within acceptable range, e.g., ±20 points)
  - Recent activity (engagement frequency)
  - Freshness (score recalculated within 30 days)
  - Acceptance probability (machine-learned likelihood of match success)
- **Output contract**: Returns list of suggested partners sorted by match score (highest first)
- **Endpoint**: `GET /api/forge/matchmaking/suggestions?limit=20` (auth required, returns array)
- **Backlog**: Exchange history tracking (forge_exchanges table) to avoid repeated recommendations

### 5. Data Integrity (Supabase)
- **Core tables**:
  - `forge_members`: id, user_id (FK users), domain, trust_score, niche, badge_installe, statut, created_at, updated_at
  - `badge_clients`: id, domain (unique), trust_score, description, category, verified_at, issued_at, expires_at
  - `forge_submissions`: id, domain, content_url, niche, status, trust_score_candidate, alfred_notes, user_email, created_at
  - `forge_exchanges` (future): id, member_a_id, member_b_id, exchange_status, initiated_at, completed_at
- **Foreign key constraints**: Strict (8 FK constraints applied; tier_abonnement field unified to match tier_forge naming)
- **No orphans**: Always verify FK integrity before writes

### 6. Auth System (5 Methods)
- **Methods**: Google OAuth, Microsoft OAuth, LinkedIn OAuth, Magic Link, Email/Password, Passkeys/WebAuthn
- **WebAuthn**: Domain-scoped RP_ID — Forge passkeys ≠ SEO passkeys (by design)
- **Session pattern**: Reuses NSE cookie+JWT architecture
- **requireAuth middleware**: Wraps all protected routes; returns 401 if missing/expired token
- **Cross-domain auth**: Cookie scope carefully set for noxelforge.com (not noxelseo.com)

### 7. Stripe Integration
- **Products**: Pre-created in Stripe Dashboard (Bronze/Silver/Gold/Platinum/Diamond)
- **Subscription webhook**: Handles subscription.created, subscription.updated, subscription.deleted
- **Credit system**: Anthropic SDK costs credited against user's tier
- **Refund webhook**: Triggers 14-day window on subscription.canceled
- **Testing**: Use Stripe test keys in .env.example; switch to live keys in production

### 8. Known Gotchas & Pièges
- **Supabase JS client**: `insert()`, `update()` return `{ error }` on failure (no exception); must check explicitly
- **Cron timezone**: forgeBadgeCron hardcoded to 9AM EST; adjust if company moves timezones
- **Alfred API costs**: Each submission review calls claude-sonnet-4-6 API; monitor Anthropic account credits
- **WebAuthn domains**: Changing domain breaks all existing passkeys (security requirement)
- **Spam gate**: spamGate.service.ts runs asynchronously; may not catch all spam before publication
- **CORS origin**: Mismatch between .env CORS_ORIGIN and actual deploy URL breaks browser requests

## Agent Roles

### 🧪 `testeur_forge` — Test & Validation Agent
**Access**: Full codebase read, test runners, API client, Stripe test keys (no real deployments)

**Responsibilities**:
- Test matchmaking algorithm (input → sorted partner list)
- Validate Trust Score calculations (6-signal model)
- Verify tier submission caps are enforced
- Test Auth flows (all 5 methods: Google, Microsoft, LinkedIn, Magic, Passkeys)
- Test Stripe subscription workflows (create → update → cancel)
- Verify badge cron runs and Alfred reviews submissions
- Check domain ownership verification flow
- Test anti-spam detection (spamGate.service.ts)
- Validate email notifications (submission confirmations, badge status, refunds)
- Test Supabase FK constraints (no orphans allowed)

**Reports**: Matchmaking accuracy, tier enforcement, auth success rate, Stripe reconciliation, data integrity

---

### 🔍 `relecteur_forge` — Code Review Agent
**Access**: Full codebase read+write, no deployments, can commit with approval

**Responsibilities**:
- Review matchmaking algorithm for fairness (niche proximity, score delta, freshness)
- Audit Trust Score service (trustScore.service.ts) for correctness
- Check API route contracts (forge.routes.ts, stripe.forge.routes.ts)
- Verify Supabase schema + FK constraints
- Review Auth middleware and OAuth implementations
- Fix structural errors (missing exports, type mismatches, route binding)
- Validate TypeScript compilation (tsconfig.json rules)
- Check Stripe webhook signature verification
- Review Alfred AI service integration (claude-sonnet-4-6 calls, prompt quality)
- Audit badge cron logic and grace period handling
- Check environment variable usage (.env.example coverage)

**Fixes**: Type errors, missing handlers, algorithm bugs, payment flow breaks, auth failures

---

### ✍️ `redacteur_forge` — Copy & Localization Agent
**Access**: Frontend text, UI strings, localization files

**Responsibilities**:
- Write/review French UI copy (component labels, error messages, modal text)
- Manage tier descriptions and pricing tier copy
- Create/update badge status messages (approved, pending, rejected)
- Review brand voice consistency (Forge tone vs NSE tone vs NOXEL brand)
- Write Help Center / FAQ content
- Update email templates (subscription confirmations, badge status, refunds)
- Translate UI strings into target languages
- Ensure terms/conditions clarity (refund policy, T&Cs)
- Review payment confirmation messaging
- Check for typos and grammar across all user-facing text

**Outputs**: French strings, UI translations, email templates, help content

---

## Common Tasks

### Running the Backend Locally
```bash
cd backend
cp .env.example .env
npm install
npm run dev
# → http://localhost:4000
```

### Running the Frontend Locally
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### Test Matchmaking
```bash
curl -X GET "http://localhost:4000/api/forge/matchmaking/suggestions?limit=20" \
  -H "Authorization: Bearer YOUR_TEST_JWT"
```

### Test Trust Score Calculation
```bash
# Verify score = (Tech×0.25 + Authority×0.25 + Spam×0.20 + Content×0.15 + Age×0.10 + Freq×0.05) / 100
```

### Deploy (User Action Only)
Backend: Push to GitHub → Railway auto-deploys
Frontend: Push to GitHub → Vercel auto-deploys

---

## Backlog & Known Gaps

### High Priority
- **Exchange history tracking** (forge_exchanges table): Log who matched with whom, when; use to avoid duplicate recommendations (V1.5)
- **Tier badges**: the pages show 96 px PNG exports (`frontend/public/tiers/*_tier.png`, ~15–20 kB) rendered from the vector masters `frontend/public/*_tier.svg` (traced 1254 px, 200–600 kB, kept as sources). Re-export the PNG if a master changes
- **Alfred safety guardrails**: Add additional checks to prevent Alfred from approving spam submissions

### Medium Priority
- **Matchmaking V1.5**: Add "opportune moment" signals (user just published, high engagement this week)
- **Match justification text**: Have Alfred explain why two partners were matched (transparency)
- **Dynamic pricing**: Tier pricing should adjust by company size / domain age (future experiment)
- **Blacklist UI**: Admin interface to manually revoke badges for abuse

### Low Priority
- **Passive activity signals**: Derive activity from page views, submission timestamps (not yet captured)
- **Regional preference**: Allow users to filter by geographic region/language
- **Content categories**: Expand niche taxonomy beyond current 15 categories

---

## Useful Commands

| Command | Purpose |
|---------|---------|
| `npm run build` | Build frontend (Vite) |
| `npm run lint` | ESLint check |
| `npm run type-check` | TypeScript compilation check |
| `npm run deploy` | (User-only) Push to GitHub |
| `npm run dev` | Start dev server (backend or frontend) |

---

## Git Workflow

- **Agents fix errors, commit with approval-required message**
- **User reviews commits before push**
- **Shallow clone used** (--depth 1); fetch full history if needed for blame/log: `git fetch --depth=1000 origin BRANCH`
- **Before push from shallow clone**: Run `git fetch origin main` to avoid re-uploading entire tree

---

## Resources

- **Trust Score Forge Framework**: See /areas/noxel-forge.md in user memory
- **Product Roadmap**: V1 live with matchmaking; V1.5 adds exchange history
- **Pricing Model**: See /areas/noxel-forge.md for tier details + early bird strategy
- **Known Issues Tracker**: See Backlog & Known Gaps section above

---

## Environment Variables

See `backend/.env.example`:
- `STRIPE_SECRET_KEY`: Test or Live (Stripe Dashboard)
- `ANTHROPIC_API_KEY`: For Alfred AI reviewer
- `SUPABASE_URL`, `SUPABASE_KEY`: Supabase project
- `CORS_ORIGIN`: Must match frontend deploy domain (e.g., `https://noxelforge.com`)
- `JWT_SECRET`: Session signing key
- `FORGE_ADMIN_EMAILS`: comma-separated admin e-mails allowed to enter authority/spam signals
- `SMTP_*`: Email service credentials (Resend, SendGrid, etc.)

---

Last updated: October 10, 2026
Agents: testeur_forge, relecteur_forge, redacteur_forge

## Consentement cookies — NOXEL Consent 1.4.0 (commun aux sites NOXEL)

- **Fichiers** : `frontend/public/consent/` (`noxel-consent.js`, `noxel-consent.css`, `sites.js`), chargés dans le `<head>` AVANT tout outil facultatif. Le même moteur est copié à l'identique dans noxel360, noxelseo, noxelforge et noxelspectra : toute modification se fait partout, version incrémentée dans l'en-tête du fichier.
- **Tout traceur passe par le kit** : script facultatif écrit `<script type="text/plain" data-consent="analytics|marketing|preferences" data-src="…">`, SDK démarré par `NoxelConsent.register()` ou rendu seulement si `NoxelConsent.has(catégorie)` (hook `src/components/consent/useNoxelConsent.ts`). Jamais de GTM, gtag, pixel, `<noscript>` de suivi ou widget tiers actif en direct. Déclarer l'outil dans `providers` et, pour un composant React, sa catégorie dans `enabledCategories`.
- **Mémoire entre les sites** : le choix voyage dans les liens vers les autres sites NOXEL (`#nxc=…`, sans identifiant, accepté seulement si la page d'origine est un site NOXEL). Donc **pas de `noreferrer`** sur un lien vers noxel360.com, noxelseo.com, noxelforge.com ou noxelspectra.com (`rel="noopener"` suffit) ; pour `window.open`, passer l'adresse par `NoxelConsent.relayUrl(url)`.
- **Politique** : noxelforge.com pointe vers `/policies/privacy.html` (frontend/public/policies/ de Forge) ; noxelspectra.com et app.noxelspectra.com pointent vers la politique de la vitrine (`https://www.noxelspectra.com/#confidentialite`). Changer d'outil ou de finalité = incrémenter `policyVersion` du site dans `sites.js`.
- **Look** (1.2.0) : charte NOXEL (fond #1a1a1a, textes #f5f5f5/#888, vert #3ddc84, violet #A855F7) et boutons HUD (dessins `cancel`, `ok`, `apply-filters`, `save-recipe`, `remove-image`, `protect` copiés tels quels de hud-data.ts du kit HUD de Spectra, intégrés au moteur).
- **Ouverture à l'arrivée** (1.4.0, `openOnArrival: true` dans `sites.js`) : la même fenêtre de préférences s'ouvre sur tous les sites NOXEL tant qu'aucun choix n'existe. Catégories et outils du réseau définis une seule fois dans `NOXEL_CONSENT_NETWORK` (`sites.js`) — ne pas redéclarer de `providers` dans les pages. « Fermer sans modifier » (ou Échap) = continuer sans accepter. Interface en `translate="no"` (déjà fr/en).
- Le kit (README, tests `core`, `relay`, `consent`) et le plan d'exécution sont la référence ; le kit ne gère que fr/en.
