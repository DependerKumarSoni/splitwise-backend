import express from 'express';
import cors from 'cors';
import { createGroupRoutes } from './routes/groupRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { createAuthRoutes } from './routes/authRoutes.js';
import { createRequireAuth } from './middleware/requireAuth.js';

export function createApp(repo) {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use('/api/auth', createAuthRoutes(repo, jwtSecret))

  const requireAuth = createRequireAuth(jwtSecret);
  app.use('/api', requireAuth, createGroupRoutes(repo));

  app.use(errorHandler);

  return app;
}