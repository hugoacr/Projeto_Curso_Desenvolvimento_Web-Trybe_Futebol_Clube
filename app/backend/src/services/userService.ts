import newToken from '../helpers/newToken';
import HandleError from '../helpers/handleError';
import UsersModel from '../database/models/userModel';
import { IUserRepository, IUserService } from '../interfaces/userInterface';

class UserService implements IUserService {
  constructor(private model: IUserRepository) {
    this.model = model;
  }

  public async userLogin(email: string, password: string): Promise<UsersModel> {
    const userData = await this.model.userLogin(email, password);
    // const verifyPassword = await compareSync(password, userData.password);

    console.log(userData);

    if (!userData.email || !userData.password) {
      throw new HandleError(400, 'All fields must be filled');
    }

    return newToken(userData) as unknown as UsersModel;

  }
}

export default UserService;