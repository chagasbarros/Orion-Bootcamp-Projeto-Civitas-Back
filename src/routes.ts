import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import { UserController } from './controller/UserController';
import { RoleController } from './controller/RoleController';

const router = Router();

router.get('/', new HomeController().hello);

// User
router.post('/user', new UserController().saveUser);

// Role
router.post('/role', new RoleController().createRole);

export default router;
