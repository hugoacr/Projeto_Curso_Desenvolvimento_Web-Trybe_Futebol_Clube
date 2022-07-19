import TeamsModel from "../database/models/teamsModel";

export interface ITeams {
  id?: number;
  team_name: string;
}

export interface ITeamsRepository {
  listTeams(): Promise<TeamsModel>
}

export interface ITeamsService {
  listTeams(): Promise<TeamsModel>
}