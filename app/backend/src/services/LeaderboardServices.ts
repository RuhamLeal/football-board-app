import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { LeaderboardLn, ILeaderboard } from '../interfaces/Leaderboard';
import { ILeaderboardService } from '../interfaces/Services';
import LeaderboardValidation from './validations/LeaderboardValidation';

export default class LeaderboardService implements ILeaderboardService {
  constructor(private _matchModel = Match, private _teamModel = Team) {}

  public async findStandingByRef(reference: 'home' | 'away'): Promise<ILeaderboard[]> {
    const data = await this._teamModel.findAll({
      include: [
        {
          model: Match,
          as: reference === 'home' ? 'homeMatches' : 'awayMatches',
          where: { inProgress: false },
          attributes: { exclude: ['id', 'inProgress'] },
        },
      ],
    });

    return LeaderboardValidation.sortDates(data as LeaderboardLn[], reference);
  }
}
