import { Router } from 'express';
import TeamController from '../controllers/TeamControllers';

const teamController = new TeamController();

const router = Router();

router.get('/', (req, res, next) => teamController.getAllTeams(req, res, next));

export default router;
