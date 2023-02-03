import { IMatch } from '../interfaces/Match';
import Match from '../database/models/Match';
import { IMatchService } from '../interfaces/Services';
import Team from '../database/models/Team';

export default class MatchService implements IMatchService {
  constructor(private _model = Match) {}

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
