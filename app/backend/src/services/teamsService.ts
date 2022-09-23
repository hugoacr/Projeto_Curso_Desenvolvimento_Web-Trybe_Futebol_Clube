import TeamsModel from '../database/models/teamsModel';
import { ITeamsService, ITeamsRepository } from '../interfaces/teamsInterface';

class TeamsService implements ITeamsService {
  constructor(private model: ITeamsRepository) {
    this.model = model;
  }

  public async listTeams(): Promise<TeamsModel[]> {
    const teamsData = await this.model.listTeams();

    return teamsData as TeamsModel[];
  }

  public async listOneTeam(id: number): Promise<TeamsModel> {
    const teamsData = await this.model.listOneTeam(id);

    return teamsData as TeamsModel;
  }
}

export default TeamsService;
