export default {
  id: '',
  token: 'any_token',
  secret: '',

  sign(id: string, secret: string) {
    this.id = id;
    this.secret = secret;
    return this.token;
  },
};
