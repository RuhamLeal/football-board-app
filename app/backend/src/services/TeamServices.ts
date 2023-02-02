import ITeam from '../interfaces/Team';
import Team from '../database/models/Team';
import { ITeamService } from '../interfaces/Services';
import ErrorHandler from './utils/ErrorHandler';
import TeamValidations from './validations/TeamValidation';

export default class TeamServices implements ITeamService {
  constructor(private _model = Team) {}

  public async findTeamById(id: number): Promise<ITeam | null> {
    TeamValidations.validateId(id);

    const team = await this._model.findByPk(id);

    if (!team) throw new ErrorHandler(404, 'Team not found');

    return team;
  }

  public async findAllTeams(): Promise<ITeam[]> {
    const teams = await this._model.findAll();
    return teams;
  }
}
