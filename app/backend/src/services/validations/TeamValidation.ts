import ErrorHandler from '../utils/ErrorHandler';

export default class TeamValidations {
  public static validateId(id: number): void {
    if (typeof id !== 'number' || Number.isNaN(id)) {
      throw new ErrorHandler(400, 'Id must be a number');
    }
  }
}
