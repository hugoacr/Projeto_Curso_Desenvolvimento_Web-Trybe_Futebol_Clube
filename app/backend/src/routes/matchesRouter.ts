import { Router } from 'express';
import MatchesController from '../controller/matchesController';
import MatchesRepository from '../repositories/matchesRepository';
import MatchesService from '../services/matchesService';
import validateToken from '../middlewares/validateToken'

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

  matchesRouter.post('/', validateToken, (req, res, next) =>{
    matchesFactory().IncludeMatch(req, res, next);
  });

  matchesRouter.patch('/:id/finish', (req, res, next) =>{
    matchesFactory().FinishProgress(req, res, next);
  });

export default matchesRouter;