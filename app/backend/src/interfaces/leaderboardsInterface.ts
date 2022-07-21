import LeaderboardsRepository from "../repositories/leaderboardsRepository";

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
    getLeaderboards(): Promise<LeaderboardsRepository[]>
}

export interface ILeaderboardsRepository {
    buildLeaderboard(): Promise<ILeaderboards[]>
}