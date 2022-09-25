import { NextFunction, Request, Response } from 'express';
import { ITeamsService } from '../interfaces/teamsInterface';

class TeamsController {
  constructor(private service: ITeamsService) {
    this.service = service;
  }

  async ListTeams(req: Request, res: Response, next: NextFunction) {
    try {
      const teamsData = await this.service.listTeams();

      return res.status(200).send(teamsData);
    } catch (error) {
      next(error);
    }
  }

  async ListOneTeam(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const teamsData = await this.service.listOneTeam(Number(id));

      return res.status(200).send(teamsData);
    } catch (error) {
      next(error);
    }
  }
}

export default TeamsController;
