import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserServices';
import { IUserService } from '../interfaces/Services';

export default class UserController {
  constructor(private _service: IUserService = new UserService()) {}

  public async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userLogging = req.body;

      const token = await this._service.login(userLogging);

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
