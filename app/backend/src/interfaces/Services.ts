import ITeam from './Team';
import { Login, IUser } from './User';

export interface IUserService {
  getUserByEmail(email: string): Promise<IUser | null>
  login(login: Login): Promise<string | null>;
}

export interface ITeamService {
  findAllTeams(): Promise<ITeam[]>;
}
