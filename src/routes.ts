import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import { AuthController } from './controller/AuthController';

const router = Router();

router.get('/', new HomeController().hello);

// Auth
router.post('/login', new AuthController().login);

// Middleware
router.use('/protected', new AuthController().middleware);

export default router;
