import express from 'express';
import cors from 'cors';
import { createGroupRoutes } from './routes/groupRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createApp(repo) {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });
  app.use('/api', createGroupRoutes(repo));

  app.use(errorHandler);

  return app;
}