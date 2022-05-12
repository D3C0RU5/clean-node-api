import { MissingParamError } from '../../../utils/errors';

export class LoadUserByEmailRepository {
  userModel;
  constructor(userModel) {
    this.userModel = userModel;
  }

  async load(email) {
    if (!email) {
      throw new MissingParamError('email');
    }
    const user = await this.userModel.findOne({ email });
    return user;
  }
}
