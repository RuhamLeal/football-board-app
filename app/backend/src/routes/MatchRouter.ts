import { Router } from 'express';
import jwtAuthentication from '../middlewares/jwtAuthentication';
import MatchController from '../controllers/MatchControllers';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get('/', (req, res, next) => matchController.getAllMatches(req, res, next));
matchRouter.post(
  '/',
  jwtAuthentication,
  (req, res, next) => matchController.postNewMatch(req, res, next),
);
matchRouter.patch(
  '/:id',
  (req, res, next) => matchController.updateMatchPoints(req, res, next),
);
matchRouter.patch(
  '/:id/finish',
  (req, res, next) => matchController.updateMatchProgress(req, res, next),
);

export default matchRouter;
