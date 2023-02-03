import { ILeaderboard, LeaderboardLn, ScoreStats } from '../../interfaces/Leaderboard';

export default class LeaderboardValidation {
  private static startGame(gameList: LeaderboardLn[]) {
    const gameStats = gameList.reduce((acc: any, curr: any) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) {
        acc.totalPoints += 3;
        acc.totalVictories += 1;
      } else if (curr.homeTeamGoals < curr.awayTeamGoals) {
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

  private static startScore(array: LeaderboardLn[]) {
    const stats = array.reduce(
      (acc: ScoreStats, curr: any) => {
        acc.goalsFavor += curr.homeTeamGoals;
        acc.goalsOwn += curr.awayTeamGoals;
        acc.goalsBalance += (curr.homeTeamGoals - curr.awayTeamGoals);
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

  public static sortDates(array: LeaderboardLn[], reference: 'home' | 'away') {
    const matches = reference === 'home' ? 'homeMatches' : 'awayMatches';
    const newArray = array.map((team) => {
      const gamesStats = LeaderboardValidation.startGame(team[matches] as any);
      const scoreStats = LeaderboardValidation.startScore(team[matches] as any);
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
