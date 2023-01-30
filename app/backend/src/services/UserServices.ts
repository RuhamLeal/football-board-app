import * as bcrypt from 'bcryptjs';
import generateToken from './utils/jwtGenerator';
import { Login, IUser } from '../interfaces/User';
import User from '../database/models/User';
import ErrorHandler from './utils/ErrorHandler';
import UserValidation from './validations/UserValidation';

export default class UserService {
  constructor(private _model = User) {}

  public async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await this._model.findOne({ where: { email } });

    return user;
  }

  public async login(login: Login): Promise<string | null> {
    UserValidation.validateLogin(login);

    const user = await this.getUserByEmail(login.email) as IUser;

    if (!user || !bcrypt.compareSync(login.password, user.password)) {
      throw new ErrorHandler(401, 'Incorrect email or password');
    }

    const token = generateToken({ id: user.id, email: user.email });

    return token;
  }
}
