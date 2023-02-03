import ErrorHandler from '../utils/ErrorHandler';

export default class MatchValidations {
  public static isMatchInProgress(value: string | null): void {
    if (value !== 'true' && value !== 'false') {
      throw new ErrorHandler(400, 'Value must be "true" or "false"');
    }
  }
}
