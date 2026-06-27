import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import forgeRoutes from './routes/forge/forge.routes';
import { initForgeBadgeCron } from './cron/forgeBadgeCron';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'NOXEL Forge Backend', timestamp: new Date().toISOString() });
});

app.use('/api/forge', forgeRoutes);
initForgeBadgeCron();

app.listen(PORT, () => console.log(`NOXEL Forge Backend — Port ${PORT}`));
export default app;
