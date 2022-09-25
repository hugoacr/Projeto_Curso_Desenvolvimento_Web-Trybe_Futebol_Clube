import MatchesModel from '../database/models/matchesModel';

export interface IMatches {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchesRepository {
  listMatches(): Promise<MatchesModel[]>,
  includeMatch(data: Omit<MatchesModel, 'id' | 'inProgress'>): Promise<MatchesModel>,
  finishProgress(id: number): Promise<void>,
  updateGoal(id: number,
    data: Omit<MatchesModel, 'id' | 'inProgress' | 'homeTeam' | 'awayTeam'>): Promise<MatchesModel>,
}

export interface IMatchesService {
  listMatches(): Promise<MatchesModel[]>,
  includeMatch(data: Omit<MatchesModel, 'id' | 'inProgress'>): Promise<MatchesModel>,
  finishProgress(id: number): Promise<void>,
  updateGoal(id: number,
    data: Omit<MatchesModel, 'id' | 'inProgress' | 'homeTeam' | 'awayTeam'>): Promise<MatchesModel>,
}
