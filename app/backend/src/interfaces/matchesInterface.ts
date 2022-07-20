import MatchesModel from "../database/models/matchesModel";

export interface IMatches {
  id?: number;
  home_team: number;
  home_team_goals: number;
  away_team: number;
  away_team_goals: number;
  in_progress: boolean;
}

export interface IMatchesRepository {
  listMatches(): Promise<MatchesModel[]>,
  includeMatch(data: Omit<MatchesModel, 'id' | 'inProgress'>): Promise<MatchesModel>,
}

export interface IMatchesService {
  listMatches(): Promise<MatchesModel[]>,
  includeMatch(data: Omit<MatchesModel, 'id' | 'inProgress'>): Promise<MatchesModel>,
}