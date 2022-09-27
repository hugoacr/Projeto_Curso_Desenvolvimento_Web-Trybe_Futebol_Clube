import 'dotenv/config';
import { SignOptions, sign } from 'jsonwebtoken';
import Model from '../database/models/userModel';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const newToken = (payload: Omit<Model, 'password'>): string => {
  const token = sign({ data: payload }, `${process.env.JWT_SECRET}`, jwtConfig as SignOptions);

  return token;
};

export default newToken;
