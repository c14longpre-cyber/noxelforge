import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import forgeRoutes from "./routes/forge/forge.routes";
import stripeForgeRoutes from "./routes/forge/stripe.forge.routes";
import authRoutes from "./routes/auth.routes";
import authMagicRoutes from "./routes/auth.magic";
import authMicrosoftRoutes from "./routes/auth.microsoft";
import authPasskeyRoutes from "./routes/auth.passkey";
import authLinkedInRoutes from "./routes/auth.linkedin";
import { initForgeBadgeCron } from "./cron/forgeBadgeCron";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.use("/api/forge/stripe/webhook", express.raw({ type: "application/json" }), stripeForgeRoutes);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
  const now = new Date();
  res.json({ status: "ok", service: "NOXEL Forge Backend", timestamp: now.toISOString() });
});

app.use("/api/forge", forgeRoutes);
app.use("/api/forge/stripe", stripeForgeRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/auth/magic", authMagicRoutes);
app.use("/api/auth", authMicrosoftRoutes);
app.use("/api/auth/passkey", authPasskeyRoutes);
app.use("/api/auth", authLinkedInRoutes);

initForgeBadgeCron();

app.listen(PORT, () => console.log("NOXEL Forge Backend - Port " + PORT));

export default app;
