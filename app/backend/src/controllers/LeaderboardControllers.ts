import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardServices';
import { ILeaderboardService } from '../interfaces/Services';

export default class LeaderboardController {
  constructor(private _service: ILeaderboardService = new LeaderboardService()) {}

  public async getStandingByRef(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    try {
      const foundStandings = await this._service.findStandingByRef('home');

      res.status(200).json(foundStandings);
    } catch (error) {
      next(error);
    }
  }
}
