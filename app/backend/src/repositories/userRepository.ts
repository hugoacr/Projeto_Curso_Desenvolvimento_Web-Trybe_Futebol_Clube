import HandleError from '../helpers/handleError';
import UserModel from '../database/models/userModel';
import { IUserRepository } from '../interfaces/userInterface';
import { compareSync } from 'bcryptjs';

class UserRepository implements IUserRepository {
  constructor(private model = UserModel) {}

  async userLogin(email: string, password:string): Promise<UserModel> {
    const userData = await this.model.findOne({ where: { email } });

    
    if (!userData) {
      throw new HandleError(401, 'Incorrect email or password');
    }
    
    const verifyPassword = compareSync(password, userData.password);

    if (!verifyPassword) {
      throw new HandleError(401, 'Incorrect email or password');
    }

    return userData as UserModel;
  }
}

export default UserRepository;