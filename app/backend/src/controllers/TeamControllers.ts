import { NextFunction, Request, Response } from 'express';
import TeamServices from '../services/TeamServices';
import { ITeamService } from '../interfaces/Services';

export default class TeamController {
  constructor(private _service: ITeamService = new TeamServices()) {}

  public async getAllTeams(_req: Request, res: Response, next: NextFunction)
    :Promise<Response | void> {
    try {
      const allTeams = await this._service.findAllTeams();

      res.status(200).json(allTeams);
    } catch (error) {
      next(error);
    }
  }

  public async getTeamById(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    try {
      const { id } = req.params;

      const team = await this._service.findTeamById(Number(id));

      res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }
}
