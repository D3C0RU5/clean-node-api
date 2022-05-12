import MongoHelper from './';

describe('Mongo Helper', () => {
  it('Should reconnect when getDb is invoked and client is disconnected', async () => {
    const sut = MongoHelper;
    await sut.connect(global.__MONGO_URI__);
    expect(MongoHelper.db).toBeTruthy();
    await sut.disconnect();
    expect(MongoHelper.db).toBeFalsy();
  });
});
