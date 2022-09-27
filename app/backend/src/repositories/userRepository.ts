import UserModel from '../database/models/userModel';
import { IUserRepository } from '../interfaces/userInterface';

class UserRepository implements IUserRepository {
  constructor(private model = UserModel) {}

  async userLogin(email: string): Promise<UserModel> {
    const userData = await this.model.findOne({ where: { email } });

    return userData as UserModel;
  }
}

export default UserRepository;
