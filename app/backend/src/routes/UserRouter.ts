import { Router } from 'express';
import jwtAuthentication from '../middlewares/jwtAuthentication';
import UserController from '../controllers/UserControllers';

const userController = new UserController();

const userRouter = Router();

userRouter.post('/login', (req, res, next) => userController.login(req, res, next));
userRouter.get(
  '/login/validate',
  jwtAuthentication,
  (req, res, next) => userController.getUserRole(req, res, next),
);

export default userRouter;
