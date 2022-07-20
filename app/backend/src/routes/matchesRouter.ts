import { Router } from 'express';
import MatchesController from '../controller/matchesController';
import MatchesRepository from '../repositories/matchesRepository';
import MatchesService from '../services/matchesService';

const matchesRouter = Router();

const matchesFactory = () => {
    const model = new MatchesRepository();
    const service = new MatchesService(model);
    const controller = new MatchesController(service);
  
    return controller;
  };

  matchesRouter.get('/', (req, res, next) =>{
    matchesFactory().ListMatches(req, res, next);
  });

  matchesRouter.post('/', (req, res, next) =>{
    matchesFactory().IncludeMatch(req, res, next);
  });

export default matchesRouter;