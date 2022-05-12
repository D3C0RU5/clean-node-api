import bcrypt from 'bcrypt';
import { Encrypter } from './';
import { MissingParamError } from '../../utils/errors/missing-param-error';

const makeSut = () => {
  return new Encrypter();
};

describe('Encrypter', () => {
  it('Should return true if bcrypt returns true', async () => {
    const sut = makeSut();
    const isValid = await sut.compare('any_value', 'hashed_value');
    expect(isValid).toBe(true);
  });

  it('Should return false if bcrypt returns false', async () => {
    const sut = makeSut();
    bcrypt.isValid = false;
    const isValid = await sut.compare('any_value', 'hashed_value');
    expect(isValid).toBe(false);
  });

  it('Should call bcrypt with correct values', async () => {
    const sut = makeSut();
    await sut.compare('any_value', 'hashed_value');
    expect(bcrypt.value).toBe('any_value');
    expect(bcrypt.hash).toBe('hashed_value');
  });

  it('Should throw if param are not provided', async () => {
    const sut = makeSut();
    expect(sut.compare(null, null)).rejects.toThrow(
      new MissingParamError('value')
    );
    expect(sut.compare('any_value', null)).rejects.toThrow(
      new MissingParamError('hash')
    );
  });
});
