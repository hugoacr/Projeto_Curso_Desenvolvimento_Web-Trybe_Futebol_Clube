import { Router } from 'express';
import teamsRouter from './teamsRouter';
import userRouter from './userRouter';

const router = Router();

router.use('/login', userRouter);
router.use('/teams', teamsRouter);

export default router;