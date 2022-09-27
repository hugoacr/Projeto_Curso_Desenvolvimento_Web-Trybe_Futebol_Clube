import LeaderboardsRepository from '../repositories/leaderboardsRepository';
import { ILeaderboards, ILeaderboardsService } from '../interfaces/leaderboardsInterface';

class LeaderboardsService implements ILeaderboardsService {
  constructor(private model: LeaderboardsRepository) {
    this.model = model;
  }

  public async getLeaderboards(view: string): Promise<ILeaderboards[]> {
    const leaderboardsData = await this.model.buildLeaderboard(view);
    return leaderboardsData as ILeaderboards[];
  }
}

export default LeaderboardsService;
