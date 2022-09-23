import LeaderboardsRepository from '../repositories/leaderboardsRepository';
import { ILeaderboardsService } from '../interfaces/leaderboardsInterface';

class LeaderboardsService implements ILeaderboardsService {
  constructor(private model: LeaderboardsRepository) {
    this.model = model;
  }

  public async getLeaderboards(view: string): Promise<LeaderboardsRepository[]> {
    const leaderboardsData = await this.model.buildLeaderboard(view);
    return leaderboardsData as unknown as LeaderboardsRepository[];
  }
}

export default LeaderboardsService;
