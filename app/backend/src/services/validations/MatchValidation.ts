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

  public static isIdValid(id: number): void {
    if (typeof id !== 'number' || Number.isNaN(id)) {
      throw new ErrorHandler(400, 'Id must be a number');
    }
  }

  public static areGoalsValid(goals: number, awayGoals: number): void {
    if (Number.isNaN(goals) || Number.isNaN(awayGoals)) {
      throw new ErrorHandler(400, 'Goals values must be numbers');
    }
  }
}
