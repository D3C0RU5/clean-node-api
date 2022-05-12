import jwt from 'jsonwebtoken';
import { MissingParamError } from '../errors';

export class TokenGenerator {
  secret: string;
  constructor(secret) {
    this.secret = secret;
  }
  async generate(id: string) {
    if (!this.secret) {
      throw new MissingParamError('secret');
    }
    if (!id) {
      throw new MissingParamError('id');
    }
    return jwt.sign(id, this.secret);
  }
}
