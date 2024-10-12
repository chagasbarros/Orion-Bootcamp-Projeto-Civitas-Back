import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import { AuthController } from './controller/AuthController';

const router = Router();

router.get('/', new HomeController().hello);

// Auth
router.post('/login', new AuthController().login);

router.use('/user', (req, res, next) => {
  console.log(req);
  res.send('uai');
});

export default router;
