import { Login } from '../../interfaces/User';
import ErrorHandler from '../utils/ErrorHandler';

export default class UserValidation {
  public static validateLogin(login: Login): void {
    if (!login.email || !login.password) {
      throw new ErrorHandler(400, 'All fields must be filled');
    }
  }
}
