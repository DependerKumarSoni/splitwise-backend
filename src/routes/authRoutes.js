import { Router } from 'express';
import { createAuthController } from '../controllers/authController';
import { createRequireAuth } from '../middleware/requireAuth';

export function createAuthRoutes(repo, jwtSecret) {
    const router = Router();
    const controller = createAuthController(repo, jwtSecret);
    const requireAuth = createRequireAuth(jwtSecret);

    router.post('/register', controller.register);
    router.post('/login', controller.login);

    router.get('/me', requireAuth, controller.me);

    return router;
}