import { compareSync } from 'bcryptjs';
import newToken from '../helpers/newToken';
import HandleError from '../helpers/handleError';
import UsersModel from '../database/models/userModel';
import { IUserRepository, IUserService } from '../interfaces/userInterface';

class UserService implements IUserService {
  constructor(private model: IUserRepository) {
    this.model = model;
  }

  public async userLogin(email: string, password: string): Promise<UsersModel> {
    const userData = await this.model.userLogin(email);

    if (!userData) {
      throw new HandleError(401, 'Incorrect email or password');
    }

    const verifyPassword = compareSync(password, userData.password);

    if (!verifyPassword) {
      throw new HandleError(401, 'Incorrect email or password');
    }

    return newToken(userData) as unknown as UsersModel;
  }
}

export default UserService;
