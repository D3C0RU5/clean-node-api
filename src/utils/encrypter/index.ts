import bcrypt from 'bcrypt';
import { MissingParamError } from '../../utils/errors/missing-param-error';

export class Encrypter {
  isValid: boolean;
  async compare(value: string, hash: string) {
    if (!value) {
      throw new MissingParamError('value');
    }
    if (!hash) {
      throw new MissingParamError('hash');
    }
    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  }
}
