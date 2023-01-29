import { Router } from 'express';
import UserController from '../controllers/UserControllers';

const userController = new UserController();

const userRouter = Router();

userRouter.post('/login', (req, res, next) => userController.login(req, res, next));

export default userRouter;
