import MatchesModel from '../database/models/matchesModel';
import TeamsModel from '../database/models/teamsModel';
import { IMatchesRepository } from '../interfaces/matchesInterface';
import HandleError from '../helpers/handleError';

class MatchesRepository implements IMatchesRepository {
  constructor(
    private model = MatchesModel,
    private teamModel = TeamsModel,
  ) {}

  async listMatches(): Promise<MatchesModel[]> {
    const matchesData = await this.model.findAll({ include: [
      { model: TeamsModel, as: 'teamHome' },
      { model: TeamsModel, as: 'teamAway' },
    ] });

    return matchesData as MatchesModel[];
  }

  async includeMatch(data: Omit<MatchesModel, 'id' | 'inProgress'>): Promise<MatchesModel> {
    const newMatch = await this.model.create(data);
    const homeTeam = await this.teamModel.findByPk(data.homeTeam);
    const awayTeam = await this.teamModel.findByPk(data.awayTeam);

    if (!homeTeam || !awayTeam) {
      throw new HandleError(404, 'There is no team with such id!');
    }

    return newMatch as MatchesModel;
  }

  async finishProgress(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateGoal(
    id: number,
    data: Omit<MatchesModel, 'id' | 'inProgress' | 'homeTeam' | 'awayTeam'>,
  ): Promise<MatchesModel> {
    await this.model.update(data, { where: { id } });
    const updateGoalMatch = await this.model.findByPk(id);
    return updateGoalMatch as MatchesModel;
  }
}

export default MatchesRepository;
