// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import weatherRoutes from './routes/weather.js';
import observationsRoutes from './routes/observations.js';
import alertsRoutes from './routes/alerts.js';
import advicesRoutes from './routes/advices.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: "https://tantsaha-connect-frontend.vercel.app",
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/weather', weatherRoutes);
app.use('/observations', observationsRoutes);
app.use('/alerts', alertsRoutes);
app.use('/advices', advicesRoutes);

app.listen(3001, () => console.log("Backend opérationnel sur http://localhost:3001"));
