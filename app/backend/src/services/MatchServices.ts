import { IMatch, NewMatch } from '../interfaces/Match';
import Match from '../database/models/Match';
import { IMatchService } from '../interfaces/Services';
import Team from '../database/models/Team';
import MatchValidations from './validations/MatchValidation';
import ErrorHandler from './utils/ErrorHandler';

export default class MatchService implements IMatchService {
  constructor(private _model = Match, private _exModel = Team) {}

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

  public async findMatchById(id: number): Promise<IMatch | null> {
    MatchValidations.isIdValid(id);

    const foundMatch = await this._model.findByPk(id);

    if (!foundMatch) throw new ErrorHandler(404, 'Match not found');

    return foundMatch;
  }

  public async updateMatchProgress(id: number): Promise <number | null> {
    const foundMatch = await this.findMatchById(id);

    if (!foundMatch?.inProgress) throw new ErrorHandler(400, 'Match already finished');

    const [updatedMatch] = await this._model.update({ inProgress: false }, { where: { id } });
    return updatedMatch;
  }

  public async createNewMatch(match: NewMatch): Promise<IMatch> {
    MatchValidations.areEqualTeams(match.homeTeamId, match.awayTeamId);

    const teamsIds = await Promise.all(
      [match.homeTeamId, match.awayTeamId].map(async (id) => this._exModel.findByPk(id)),
    );

    const teamWithoutId = teamsIds.some((id) => id === null);

    if (teamWithoutId) throw new ErrorHandler(404, 'There is no team with such id!');

    const newMatch = await this._model.create({ ...match, inProgress: true });

    return newMatch;
  }
}
