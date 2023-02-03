import { IMatch, NewMatch } from './Match';
import ITeam from './Team';
import { Login, IUser } from './User';

export interface IUserService {
  getUserByEmail(email: string): Promise<IUser | null>
  login(login: Login): Promise<string | null>;
}

export interface ITeamService {
  findAllTeams(): Promise<ITeam[]>;
  findTeamById(id: number): Promise<ITeam | null>;
}

export interface IMatchService {
  findAllMatchs(): Promise<IMatch[]>;
  findMatchesInProgress(value: string | null): Promise<IMatch[]>;
  createNewMatch(match: NewMatch): Promise<IMatch>
  findMatchById(id: number): Promise<IMatch | null>
  updateMatchProgress(id: number): Promise <number | null>
}
