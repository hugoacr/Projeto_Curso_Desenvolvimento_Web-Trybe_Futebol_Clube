import UserModel from "../database/models/userModel";

export interface IUser {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IUserRepository {
  userLogin(email: string): Promise<UserModel>
}

export interface IUserService {
  userLogin(email: string, password: string): Promise<UserModel>;
}
