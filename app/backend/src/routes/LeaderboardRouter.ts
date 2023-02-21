import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardControllers';

const leaderboardController = new LeaderboardController();

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/home',
  (req, res, next) => leaderboardController.getHomeStandingByRef(req, res, next),
);

leaderboardRouter.get(
  '/away',
  (req, res, next) => leaderboardController.getAwayStandingByRef(req, res, next),
);

leaderboardRouter.get(
  '/',
  (req, res, next) => leaderboardController.getGeneralStandings(req, res, next),
);

export default leaderboardRouter;
