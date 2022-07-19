import TeamsModel from '../database/models/teamsModel';
import { ITeamsRepository } from '../interfaces/teamsInterface';

class TeamsRepository implements ITeamsRepository {
  constructor(private model = TeamsModel) {}

  async listTeams(): Promise<TeamsModel> {
    const teamsData = await this.model.findAll();

    return teamsData as unknown as TeamsModel;
  }

}

export default TeamsRepository;