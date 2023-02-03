import ErrorHandler from '../utils/ErrorHandler';

export default class MatchValidations {
  public static isMatchInProgress(value: string | null): void {
    if (value !== 'true' && value !== 'false') {
      throw new ErrorHandler(400, 'Value must be "true" or "false"');
    }
  }

  public static areEqualTeams(team1: number, team2: number): void {
    if (team1 === team2) {
      throw new ErrorHandler(422, 'It is not possible to create a match with two equal teams');
    }
  }
}
