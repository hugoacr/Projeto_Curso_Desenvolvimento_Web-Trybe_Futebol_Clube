import { Router } from 'express';
import TeamsController from '../controller/teamsController';
import TeamsRepository from '../repositories/teamsRepository';
import TeamsService from '../services/teamsService';

const teamsRouter = Router();

const teamsFactory = () => {
    const model = new TeamsRepository();
    const service = new TeamsService(model);
    const controller = new TeamsController(service);
  
    return controller;
  };

  teamsRouter.get('/:id', (req, res, next) =>{
    teamsFactory().ListOneTeam(req, res, next);
  });

  teamsRouter.get('/', (req, res, next) =>{
    teamsFactory().ListTeams(req, res, next);
  });

export default teamsRouter;