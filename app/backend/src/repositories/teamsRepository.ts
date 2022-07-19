import TeamsModel from '../database/models/teamsModel';
import { ITeamsRepository } from '../interfaces/teamsInterface';

class TeamsRepository implements ITeamsRepository {
  constructor(private model = TeamsModel) {}

  async listTeams(): Promise<TeamsModel[]> {
    const teamsData = await this.model.findAll();

    return teamsData as TeamsModel[];
  }

  async listOneTeam(id: number): Promise<TeamsModel> {
    const teamsData = await this.model.findByPk(id);

    return teamsData as TeamsModel;
  }

}

export default TeamsRepository;