import MongoHelper from '../../helpers/mongo-helper';
import { LoadUserByEmailRepository } from './';
import { MissingParamError } from '../../../utils/errors';

let db;

const makeSut = () => {
  const userModel = db.collection('users');
  const sut = new LoadUserByEmailRepository(userModel);

  return { userModel, sut };
};

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    db = await MongoHelper.connect(global.__MONGO_URI__);
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany();
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  it('Should return null if no user is found', async () => {
    const { sut } = makeSut();
    const user = await sut.load('invalid_email@mail.com');
    expect(user).toBeNull();
  });

  it('Should return user if user is found', async () => {
    const { sut, userModel } = makeSut();
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password',
    });
    const user = await sut.load('valid_email@mail.com');
    expect(user._id).toStrictEqual(fakeUser.insertedId);
  });

  it('Should throw if no userModel is provided', async () => {
    const sut = new LoadUserByEmailRepository(null);
    const promise = sut.load('valid_email@mail.com');
    expect(promise).rejects.toThrow();
  });
  it('Should throw if no email is provided', async () => {
    const { sut } = makeSut();
    const promise = sut.load(null);
    expect(promise).rejects.toThrow(new MissingParamError('email'));
  });
});
