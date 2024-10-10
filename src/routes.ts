import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import { LoginController } from './controller/LoginController';

const router = Router();

router.get('/', new HomeController().hello);

router.post('/login', new LoginController().login);

export default router;
