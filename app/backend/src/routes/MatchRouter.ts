import { Router } from 'express';
import MatchController from '../controllers/MatchControllers';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get('/', (req, res, next) => matchController.getAllMatches(req, res, next));

export default matchRouter;
