import TeamsModel from '../database/models/teamsModel';

export interface ITeams {
  id?: number;
  teamName: string;
}

export interface ITeamsRepository {
  listTeams(): Promise<TeamsModel[]>,
  listOneTeam(id: number): Promise<TeamsModel>
}

export interface ITeamsService {
  listTeams(): Promise<TeamsModel[]>
  listOneTeam(id: number): Promise<TeamsModel>
}
