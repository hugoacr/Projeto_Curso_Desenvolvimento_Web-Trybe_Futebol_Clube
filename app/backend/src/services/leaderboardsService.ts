import LeaderboardsRepository from '../repositories/leaderboardsRepository';
import { ILeaderboardsService } from '../interfaces/leaderboardsInterface';

class LeaderboardsService implements ILeaderboardsService {
  constructor(private model: LeaderboardsRepository) {
    this.model = model;
  }

  public async getLeaderboards(): Promise<LeaderboardsRepository[]> {
    const leaderboardsData = await this.model.buildLeaderboard();
    return leaderboardsData as unknown as LeaderboardsRepository[];
  }

}

export default LeaderboardsService;