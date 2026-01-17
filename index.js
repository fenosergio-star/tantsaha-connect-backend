// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/auth.js';
import weatherRoutes from './routes/weather.js';
import observationsRoutes from './routes/observations.js';
import alertsRoutes from './routes/alerts.js';
import advicesRoutes from './routes/advices.js';
import culturesRoutes from './routes/cultures.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://tantsaha-connect.vercel.app', 'https://tantsaha-frontend.vercel.app']
    : 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use('/audio', express.static(path.join(process.cwd(), 'public/audio')));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Tantsaha Connect API - Miasa tsara!' });
});

// Routes
app.use('/auth', authRoutes);
app.use('/weather', weatherRoutes);
app.use('/observations', observationsRoutes);
app.use('/alerts', alertsRoutes);
app.use('/advices', advicesRoutes);
app.use('/cultures', culturesRoutes);

app.listen(PORT, () => console.log(`Backend opérationnel sur le port ${PORT}`));
