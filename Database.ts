import { config } from 'dotenv';
import { MongoClient } from 'mongodb';

config();

class Database {
  private URI: string;
  private client: MongoClient;
  private dbConnection: MongoClient | null;

  constructor() {
    this.URI = process.env.CONNECTION_STRING_LOCAL || process.env.CONNECTION_STRING_PRODUCTION;
    this.client = new MongoClient(this.URI);
    this.dbConnection = null;
  }

  public async dbConnect() {
    try {
      this.dbConnection = await this.client.connect();
      console.log('Connected successfully to server');
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public getDb() {
    if (this.dbConnection?.db) {
      return this.dbConnection.db();
    }
    throw new Error('No database found. Please connect to a database first.');
  }
}

export default new Database();
