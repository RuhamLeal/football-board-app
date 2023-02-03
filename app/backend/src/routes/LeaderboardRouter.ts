import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardControllers';

const leaderboardController = new LeaderboardController();

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/home',
  (req, res, next) => leaderboardController.getStandingByRef(req, res, next),
);

export default leaderboardRouter;
