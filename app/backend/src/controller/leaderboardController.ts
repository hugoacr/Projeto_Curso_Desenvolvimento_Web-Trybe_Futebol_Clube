import { NextFunction, Request, Response } from 'express';
import { ILeaderboardsService } from '../interfaces/leaderboardsInterface';

class LeaderboardsController {
  constructor(private service: ILeaderboardsService) {
    this.service = service;
  }

  async GetLeaderboards(req: Request, res: Response, next: NextFunction) {
    try {
      const view = req.url;
      const leaderboardsData = await this.service.getLeaderboards(view.slice(1));
      return res.status(200).send(leaderboardsData);
    } catch (error) {
      next(error);
    }
  }
}

export default LeaderboardsController;
