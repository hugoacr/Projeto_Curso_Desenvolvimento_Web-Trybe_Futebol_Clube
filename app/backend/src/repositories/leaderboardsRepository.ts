import MatchesModel from '../database/models/matchesModel';
import TeamsModel from '../database/models/teamsModel';
import { ILeaderboards, ILeaderboardsRepository } from '../interfaces/leaderboardsInterface';
import { buildLeaderboard } from '../helpers/functionsLeaderboards'

class LeaderboardsRepository implements ILeaderboardsRepository {
  constructor(
    private model = MatchesModel,
    private teamModel = TeamsModel
    ) {}
    
  async buildLeaderboard(view: string): Promise<ILeaderboards[]> {
    const matchesData = await this.model.findAll();
    const teamsData = await this.teamModel.findAll();

    const Leaderboard = buildLeaderboard(teamsData, matchesData, view)
    return Leaderboard as ILeaderboards[];
  }

}

export default LeaderboardsRepository;