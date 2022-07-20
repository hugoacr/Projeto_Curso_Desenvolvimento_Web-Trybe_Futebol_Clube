import teams from '../database/models/teamsModel';
import MatchesModel from '../database/models/matchesModel';
import { IMatchesRepository } from '../interfaces/matchesInterface';

class MatchesRepository implements IMatchesRepository {
  constructor(private model = MatchesModel) {}

  async listMatches(): Promise<MatchesModel[]> {
    const matchesData = await this.model.findAll({ include: [
      { model: teams, as: 'teamHome' },
      { model: teams, as: 'teamAway' },
    ] });
    
    return matchesData as MatchesModel[];
  }

  async includeMatch(data: Omit<MatchesModel, 'id' | 'inProgress'>): Promise<MatchesModel> {
    const newMatch = await this.model.create(data);
    
    return newMatch as MatchesModel;
  }

}

export default MatchesRepository;