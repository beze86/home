import { config } from 'dotenv';
import { MongoClient } from 'mongodb';

config();

class Database {
  URI: string;
  private client: MongoClient;
  private dbConnection: MongoClient | null;

  constructor() {
    this.URI = !!process.env.NODE_ENV ? process.env.CONNECTION_STRING_PRODUCTION : process.env.CONNECTION_STRING_LOCAL;
    this.client = new MongoClient(this.URI);
    this.dbConnection = null;
  }

  public async dbConnect() {
    try {
      this.dbConnection = await this.client.connect();
      console.log('Connected successfully to server');
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to connect to database with error: ${error}`);
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
