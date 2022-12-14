export interface ILeaderboards {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

export interface ILeaderboardsService {
  getLeaderboards(view: string): Promise<ILeaderboards[]>
}

export interface ILeaderboardsRepository {
  buildLeaderboard(view: string): Promise<ILeaderboards[]>
}
