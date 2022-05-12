import jwt from 'jsonwebtoken';
import { MissingParamError } from '../errors';
import { TokenGenerator } from './';

const makeSut = () => {
  return new TokenGenerator('secret');
};

describe('Token Generator', () => {
  it('Should return null if JWT returns null', async () => {
    const sut = makeSut();
    jwt.token = null;
    const token = await sut.generate('any_id');
    expect(token).toBeNull();
  });

  it('Should a token if JWT returns token', async () => {
    const sut = makeSut();
    const token = await sut.generate('any_id');
    expect(token).toBe(jwt.token);
  });

  it('Should call JWT with correct values', async () => {
    const sut = makeSut();
    await sut.generate('any_id');
    expect(jwt.id).toBe('any_id');
    expect(jwt.secret).toBe(sut.secret);
  });

  it('Should throw JWT if no secret is provided', async () => {
    const sut = new TokenGenerator(null);
    const promise = sut.generate('any_id');
    expect(promise).rejects.toThrow(new MissingParamError('secret'));
  });

  it('Should throw JWT if no id is provided', async () => {
    const sut = makeSut();
    const promise = sut.generate(null);
    expect(promise).rejects.toThrow(new MissingParamError('id'));
  });
});
