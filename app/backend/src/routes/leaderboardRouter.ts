import { Router } from 'express';
import LeaderboardController from '../controller/leaderboardController';
import LeaderboardsRepository from '../repositories/leaderboardsRepository';
import LeaderboardsService from '../services/leaderboardsService';

const leaderboardRouter = Router();

const leaderboardFactory = () => {
    const model = new LeaderboardsRepository();
    const service = new LeaderboardsService(model);
    const controller = new LeaderboardController(service);
  
    return controller;
  };

  leaderboardRouter.get('/home', (req, res, next) =>{
    leaderboardFactory().GetLeaderboards(req, res, next);
  });

  leaderboardRouter.get('/away', (req, res, next) =>{
    leaderboardFactory().GetLeaderboards(req, res, next);
  });

export default leaderboardRouter;