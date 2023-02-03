import { NewMatch } from './Match';

export interface GameStats {
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number;
}

export interface ScoreStats {
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
}

export interface LeaderboardLn {
  teamName: string,
  homeMatches?: NewMatch[],
  awayMatches?: NewMatch[],
}

export interface ILeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string
}
