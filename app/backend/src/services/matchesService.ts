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

  public async includeMatch(data: Omit<MatchesModel, 'id' | 'inProgress'>): Promise<MatchesModel> {  
    const newMatch = await this.model.includeMatch(data);
    return newMatch as MatchesModel;
  }

  public async finishProgress(id: number): Promise<void> {
    await this.model.finishProgress(Number(id)); 
  }
}

export default MatchesService;