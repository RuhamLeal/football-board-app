import ITeam from '../interfaces/Team';
import Team from '../database/models/Team';
import { ITeamService } from '../interfaces/Services';

export default class TeamServices implements ITeamService {
  constructor(private _model = Team) {}

  public async findAllTeams(): Promise<ITeam[]> {
    const teams = await this._model.findAll();
    return teams;
  }
}
