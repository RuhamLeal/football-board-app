export interface NewMatch {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
}

export interface IMatch extends NewMatch{
  id: number,
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
