import { config } from 'dotenv';
import { MongoClient } from 'mongodb';

config();

class Database {
  URI: string;
  private client: MongoClient;

  constructor() {
    this.URI = !!process.env.NODE_ENV ? process.env.CONNECTION_STRING_PRODUCTION : process.env.CONNECTION_STRING_LOCAL;
    this.client = new MongoClient(this.URI);
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected successfully to server');
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to connect to database with error: ${error}`);
    }
  }

  get() {
    const db = this.client.db();
    if (!db) {
      throw new Error('No database found. Please connect to a database first.');
    }
    return db;
  }

  async close() {
    try {
      await this.client.close();
      console.log('Disconnected from server');
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to disconnect from database with error: ${error}`);
    }
  }
}

export default new Database();
