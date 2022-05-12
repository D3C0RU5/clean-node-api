import { MongoClient } from 'mongodb';

export default {
  db: '',
  async connect(uri: string, dbName: string = '') {
    this.uri;
    this.dbName = dbName;
    this.client = await MongoClient.connect(uri);
    this.db = await this.client.db(dbName);
    return this.db;
  },
  async disconnect() {
    await this.client.close();
    this.db = null;
    this.client = null;
  },
};
