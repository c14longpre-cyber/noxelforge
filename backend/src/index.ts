import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { contratOk } from "./lib/contratOk";
import forgeRoutes from "./routes/forge/forge.routes";
import stripeForgeRoutes, { stripeWebhookHandler } from "./routes/forge/stripe.forge.routes";
import authRoutes from "./routes/auth.routes";
import authMagicRoutes from "./routes/auth.magic";
import authMicrosoftRoutes from "./routes/auth.microsoft";
import authPasskeyRoutes from "./routes/auth.passkey";
import authLinkedInRoutes from "./routes/auth.linkedin";
import authGithubRoutes from "./routes/auth.github";
import trustScorePublicRoutes from "./routes/forge/trustScore.public.routes";
import { initForgeBadgeCron } from "./cron/forgeBadgeCron";
import { initAuthCleanupCron } from "./cron/authCleanupCron";
import { initForgeExchangeCron } from "./cron/forgeExchangeCron";

const app = express();
const PORT = process.env.PORT || 3001;

// Railway sits in front of the app: one proxy hop, so req.ip is the real client IP
app.set("trust proxy", 1);

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(contratOk); // { ok, ..., error? } on every JSON answer

// Webhook Stripe AVANT express.json() : la signature porte sur le corps brut.
app.post("/api/forge/stripe/webhook", express.raw({ type: "application/json" }), stripeWebhookHandler);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
  const now = new Date();
  res.json({ status: "ok", service: "NOXEL Forge Backend", timestamp: now.toISOString() });
});


app.use("/api/trust-score", trustScorePublicRoutes);
app.use("/api/forge", forgeRoutes);
app.use("/api/forge/stripe", stripeForgeRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/auth/magic", authMagicRoutes);
app.use("/api/auth", authMicrosoftRoutes);
app.use("/api/auth/passkey", authPasskeyRoutes);
app.use("/api/auth", authLinkedInRoutes);
app.use("/api/auth", authGithubRoutes);

// Last: any error thrown by a route (e.g. a Supabase { error } through must()) becomes a JSON 500
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("[unhandled]", err?.message ?? err);
  if (res.headersSent) return;
  res.status(500).json({ error: "Erreur serveur." });
});

initForgeBadgeCron();
initAuthCleanupCron();
initForgeExchangeCron();

app.listen(PORT, () => console.log("NOXEL Forge Backend - Port " + PORT));

export default app;
