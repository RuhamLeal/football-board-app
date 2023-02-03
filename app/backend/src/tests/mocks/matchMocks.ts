import { IMatch, MockMatch } from "../../interfaces/Match";

const matches: MockMatch[] = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Internacional"
    }
  }
];

const matchesProgress: MockMatch[] = [
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Internacional"
    }
  },
  {
    id: 42,
    homeTeamId: 6,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "Ferroviária"
    },
    awayTeam: {
      teamName: "Avaí/Kindermann"
    }
  }
];

const matchesFinished: MockMatch[] = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "Internacional"
    },
    awayTeam: {
      teamName: "Santos"
    }
  }
];

const sucessResult = {
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

const invalidResult = {
  homeTeamGoals: 'x',
  awayTeamGoals: 2,
}


const sucessMatch = {
  homeTeamId: 12,
  awayTeamId: 7,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

const sameMatch = {
  homeTeamId: 8,
  awayTeamId: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

const invalidMatch = {
  homeTeamId: 5555,
  awayTeamId: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

const sucessMatchRes: IMatch = {
  ...sucessMatch,
  id: 1,
  inProgress: true
}


export { 
  matches, 
  matchesProgress,
  matchesFinished,
  sucessMatch,
  sucessMatchRes,
  invalidMatch,
  sameMatch,
  sucessResult,
  invalidResult,
}