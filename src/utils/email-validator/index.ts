import validator from 'validator';
import { MissingParamError } from '../../utils/errors/missing-param-error';

export class EmailValidator {
  isValid(email) {
    if (!email) {
      throw new MissingParamError('email');
    }
    return validator.isEmail(email);
  }
}
