import validator from 'validator';
import { EmailValidator } from './';
import { MissingParamError } from '../../utils/errors/missing-param-error';

const makeSut = () => new EmailValidator();

describe('Email validator', () => {
  it('Should return true if validator returns true', () => {
    const sut = makeSut();
    const isEmailValid = sut.isValid('valid_email@mail.com');

    expect(isEmailValid).toBe(true);
  });

  it('Should return false if validator returns false', () => {
    validator.isEmailValid = false;
    const sut = makeSut();
    const emailValid = sut.isValid('invalid_email@mail.com');

    expect(emailValid).toBe(false);
  });

  it('Should call validator with correct email', () => {
    const sut = makeSut();
    sut.isValid('any_email@mail.com');

    expect(validator.email).toBe('any_email@mail.com');
  });

  it('Should throw if param are not provided', async () => {
    const sut = makeSut();
    expect(() => {
      sut.isValid(null);
    }).toThrow(new MissingParamError('email'));
  });
});
