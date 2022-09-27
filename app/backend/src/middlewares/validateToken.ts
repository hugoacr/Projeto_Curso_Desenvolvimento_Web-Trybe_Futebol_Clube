import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import HandleError from '../helpers/handleError';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization as string;
    jwt.verify(token, `${process.env.JWT_SECRET}`) as jwt.JwtPayload;

    next();
  } catch (error) {
    throw new HandleError(401, 'Token must be a valid token');
  }
};

export default validateToken;
