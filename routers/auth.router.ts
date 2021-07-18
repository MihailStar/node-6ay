import express from 'express';
import { check } from 'express-validator';

import AuthController from '../controllers/auth.controller';
import roleMiddleware from '../middlewares/role.middleware';

const router = express.Router();

router.post(
  '/registration',
  [
    check('username', 'Username length from 4 to 20').isLength({
      min: 4,
      max: 20,
    }),
    check('password', 'Password length from 5 to 20').isLength({
      min: 5,
      max: 20,
    }),
  ],
  AuthController.registration
);
router.post(
  '/login',
  [
    check('username', 'Username cannot empty').notEmpty(),
    check('password', 'Password cannot empty').notEmpty(),
  ],
  AuthController.login
);
router.get('/users', roleMiddleware(['ADMIN']), AuthController.getUsers);

export default router;
