import { ILeaderboard, LeaderboardLn, ScoreStats } from '../../interfaces/Leaderboard';

export default class LeaderboardValidation {
  private static startGame(gameList: LeaderboardLn[], reference: 'home' | 'away') {
    const awayTeam = reference === 'home' ? 'away' : 'home';
    const gameStats = gameList.reduce((acc: any, curr: any) => {
      if (curr[`${reference}TeamGoals`] > curr[`${awayTeam}TeamGoals`]) {
        acc.totalPoints += 3;
        acc.totalVictories += 1;
      } else if (curr[`${reference}TeamGoals`] < curr[`${awayTeam}TeamGoals`]) {
        acc.totalLosses += 1;
      } else {
        acc.totalPoints += 1;
        acc.totalDraws += 1;
      }
      return acc;
    }, { totalPoints: 0,
      totalGames: gameList.length,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0 });
    return gameStats;
  }

  private static startScore(array: LeaderboardLn[], reference: 'home' | 'away') {
    const awayTeam = reference === 'home' ? 'away' : 'home';
    const stats = array.reduce(
      (acc: ScoreStats, curr: any) => {
        acc.goalsFavor += curr[`${reference}TeamGoals`];
        acc.goalsOwn += curr[`${awayTeam}TeamGoals`];
        acc.goalsBalance += (curr[`${reference}TeamGoals`] - curr[`${awayTeam}TeamGoals`]);
        return acc;
      },
      {
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
      },
    );

    return stats;
  }

  private static calculateDefaultStatsData(homeArr: ILeaderboard[], awayArr: ILeaderboard[]) {
    const defaultStats = homeArr.map((teamOne) => {
      const awayStats = awayArr.find((teamTwo) => teamTwo.name === teamOne.name) as ILeaderboard;

      const lb = { ...teamOne };

      lb.totalPoints += awayStats.totalPoints;
      lb.totalGames += awayStats.totalGames;
      lb.totalVictories += awayStats.totalVictories;
      lb.totalDraws += awayStats.totalDraws;
      lb.totalLosses += awayStats.totalLosses;
      lb.goalsFavor += awayStats.goalsFavor;
      lb.goalsOwn += awayStats.goalsOwn;
      lb.goalsBalance = lb.goalsFavor - lb.goalsOwn;
      lb.efficiency = ((lb.totalPoints / (lb.totalGames * 3)) * 100).toFixed(2);

      return lb;
    });

    return defaultStats;
  }

  private static sortByPoints(teamOne: ILeaderboard, teamTwo: ILeaderboard) {
    if (teamOne.totalPoints > teamTwo.totalPoints) return -1;
    if (teamOne.totalPoints < teamTwo.totalPoints) return 1;
    return 0;
  }

  private static sortByVictory(teamOne: ILeaderboard, teamTwo: ILeaderboard) {
    if (teamOne.totalVictories > teamTwo.totalVictories) return -1;
    if (teamOne.totalVictories < teamTwo.totalVictories) return 1;
    return 0;
  }

  private static sortByBalance(teamOne: ILeaderboard, teamTwo: ILeaderboard) {
    if (teamOne.goalsBalance > teamTwo.goalsBalance) return -1;
    if (teamOne.goalsBalance < teamTwo.goalsBalance) return 1;
    return 0;
  }

  private static sortByGoalsFavor(teamOne: ILeaderboard, teamTwo: ILeaderboard) {
    if (teamOne.goalsFavor > teamTwo.goalsFavor) return -1;
    if (teamOne.goalsFavor < teamTwo.goalsFavor) return 1;
    return 0;
  }

  private static sortByOwnGoals(teamOne: ILeaderboard, teamTwo: ILeaderboard) {
    if (teamOne.goalsOwn < teamTwo.goalsOwn) return -1;
    if (teamOne.goalsOwn > teamTwo.goalsOwn) return 1;
    return 0;
  }

  private static sortByMultipleParams(...sortFuncs: any[]) {
    return (teamOne: ILeaderboard, teamTwo: ILeaderboard) => {
      for (let i = 0; i < sortFuncs.length; i += 1) {
        const res = sortFuncs[i](teamOne, teamTwo);
        if (res !== 0) {
          return res;
        }
      }
    };
  }

  public static sortDefaultData(homeArr: ILeaderboard[], awayArr: ILeaderboard[]) {
    const defaultStatsData = this.calculateDefaultStatsData(homeArr, awayArr);

    return defaultStatsData
      .sort(LeaderboardValidation.sortByMultipleParams(
        LeaderboardValidation.sortByPoints,
        LeaderboardValidation.sortByVictory,
        LeaderboardValidation.sortByBalance,
        LeaderboardValidation.sortByGoalsFavor,
        LeaderboardValidation.sortByOwnGoals,
      ));
  }

  public static sortDates(array: LeaderboardLn[], reference: 'home' | 'away') {
    const matches = reference === 'home' ? 'homeMatches' : 'awayMatches';
    const newArray = array.map((team) => {
      const gamesStats = LeaderboardValidation.startGame(team[matches] as any, reference);
      const scoreStats = LeaderboardValidation.startScore(team[matches] as any, reference);
      const efficiency = ((gamesStats.totalPoints / (gamesStats.totalGames * 3)) * 100).toFixed(2);

      return { name: team.teamName, ...gamesStats, ...scoreStats, efficiency };
    });

    return newArray
      .sort(LeaderboardValidation.sortByMultipleParams(
        LeaderboardValidation.sortByPoints,
        LeaderboardValidation.sortByVictory,
        LeaderboardValidation.sortByBalance,
        LeaderboardValidation.sortByGoalsFavor,
        LeaderboardValidation.sortByOwnGoals,
      ));
  }
}
