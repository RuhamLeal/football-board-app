import { NextFunction, Request, Response } from 'express';
import { IMatchService } from '../interfaces/Services';
import MatchService from '../services/MatchServices';

export default class MatchController {
  constructor(private _service: IMatchService = new MatchService()) {}

  public async getAllMatches(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    try {
      const inProgressValue = req.query.inProgress as string;

      if (inProgressValue) {
        const matchesInProgress = await this._service.findMatchesInProgress(inProgressValue);
        res.status(200).json(matchesInProgress);
      } else {
        const allMatches = await this._service.findAllMatchs();
        res.status(200).json(allMatches);
      }
    } catch (error) {
      next(error);
    }
  }
}
