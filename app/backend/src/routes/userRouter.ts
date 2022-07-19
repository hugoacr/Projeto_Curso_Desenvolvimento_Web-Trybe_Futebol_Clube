import { Router } from 'express';
import UserController from '../controller/userController';
import UserRepository from '../repositories/userRepository';
import UserService from '../services/userService';
import validateLogin from '../middlewares/validateLogin';

const userRouter = Router();

const userFactory = () => {
    const model = new UserRepository();
    const service = new UserService(model);
    const controller = new UserController(service);
  
    return controller;
  };

  userRouter.post('/', validateLogin, (req, res, next) =>{
    userFactory().UserLogin(req, res, next);
  });

  userRouter.get('/validate', (req, res, next) =>{
    userFactory().ValidateToken(req, res, next);
  });

export default userRouter;