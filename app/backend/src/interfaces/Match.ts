export interface IMatch {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface MockMatch extends IMatch {
  homeTeam: {
    teamName: string
  },
  awayTeam: {
    teamName: string
  }
}