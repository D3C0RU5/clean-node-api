import { MissingParamError, InvalidParamError } from '../../utils/errors';

export class AuthUseCase {
  loadUserByEmailRepository: {
    load: (string: string) => { password: string; id: string };
  };
  encrypter: {
    compare: (password: string, hashedPassword: string) => true;
  };
  tokenGenerator: {
    generate: (userId: string) => string;
  };
  updateAccessTokenRepository: {
    update: (userId: string, accessToken: string) => string;
  };
  constructor({
    loadUserByEmailRepository,
    encrypter,
    tokenGenerator,
    updateAccessTokenRepository,
  }) {
    this.loadUserByEmailRepository = loadUserByEmailRepository;
    this.encrypter = encrypter;
    this.tokenGenerator = tokenGenerator;
    this.updateAccessTokenRepository = updateAccessTokenRepository;
  }
  async auth(email, password) {
    if (!email) {
      throw new MissingParamError('email');
    }
    if (!password) {
      throw new MissingParamError('password');
    }

    const user = await this.loadUserByEmailRepository.load(email);
    const isValid =
      user && (await this.encrypter.compare(password, user.password));
    if (isValid) {
      const accessToken = await this.tokenGenerator.generate(user.id);
      await this.updateAccessTokenRepository.update(user.id, accessToken);
      return accessToken;
    }

    return null;
  }
}
