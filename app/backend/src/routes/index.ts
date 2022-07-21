import { Router } from 'express';
import leaderboardRouter from './leaderboardRouter';
import matchesRouter from './matchesRouter';
import teamsRouter from './teamsRouter';
import userRouter from './userRouter';

const router = Router();

router.use('/login', userRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;