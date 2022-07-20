import { NextFunction, Request, Response } from "express";
import { IMatchesService } from "../interfaces/matchesInterface";

class MatchesController {
  constructor(private service: IMatchesService) {
    this.service = service;
  }
  
  async ListMatches(req: Request, res: Response, next: NextFunction) {
    try {
    const matchesData = await this.service.listMatches();
  
    return res.status(200).send( matchesData );
    } catch (error) {
    next(error);
    }
  }

  async IncludeMatch(req: Request, res: Response, next: NextFunction) {
    try {
    const matchData = req.body;
    const newMatch = await this.service.includeMatch(matchData);
  
    return res.status(201).send( newMatch );
    } catch (error) {
    next(error);
    }
  }
}
  
export default MatchesController;