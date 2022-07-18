import { NextFunction, Request, Response } from "express";
import { IUserService } from "../interfaces/userInterface";

class UserController {
  constructor(private service: IUserService) {
    this.service = service;
  }
  
  async UserLogin(req: Request, res: Response, next: NextFunction) {
    try {
    const { email, password } = req.body;
  
    const token = await this.service.userLogin(email, password);
  
    return res.status(200).send({ token });
    } catch (error) {
    next(error);
    }
  }
}
  
export default UserController;