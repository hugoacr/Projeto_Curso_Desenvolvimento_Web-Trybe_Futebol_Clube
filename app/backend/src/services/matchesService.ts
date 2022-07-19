import MatchesModel from '../database/models/matchesModel';
import { IMatchesService, IMatchesRepository } from '../interfaces/matchesInterface';

class MatchesService implements IMatchesService {
  constructor(private model: IMatchesRepository) {
    this.model = model;
  }

  public async listMatches(): Promise<MatchesModel[]> {
    const teamsData = await this.model.listMatches();

    return teamsData as MatchesModel[];
  }
}

export default MatchesService;