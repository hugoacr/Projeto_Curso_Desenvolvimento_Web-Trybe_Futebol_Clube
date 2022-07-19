import { NextFunction, Request, Response } from "express";
import { IMatchesService } from "../interfaces/matchesInterface";

class MatchesController {
  constructor(private service: IMatchesService) {
    this.service = service;
  }
  
  async ListMatches(req: Request, res: Response, next: NextFunction) {
    try {
  
    const teamsData = await this.service.listMatches();
  
    return res.status(200).send( teamsData );
    } catch (error) {
    next(error);
    }
  }
}
  
export default MatchesController;