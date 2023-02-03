import { IMatch } from '../interfaces/Match';
import Match from '../database/models/Match';
import { IMatchService } from '../interfaces/Services';
import Team from '../database/models/Team';
import MatchValidations from './validations/MatchValidation';

export default class MatchService implements IMatchService {
  constructor(private _model = Match) {}

  public async findMatchesInProgress(value: string | null): Promise<IMatch[]> {
    MatchValidations.isMatchInProgress(value);

    const inProgress = value === 'true';

    const matchesInProgress = await this._model.findAll({
      where: { inProgress },
      include: [
        { model: Team,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        { model: Team,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matchesInProgress;
  }

  public async findAllMatchs(): Promise<IMatch[]> {
    const allMatches = await this._model.findAll({
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return allMatches;
  }
}
