import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

const URI = process.env.CONNECTION_STRING_LOCAL || process.env.CONNECTION_STRING_PRODUCTION;

// Create a new MongoClient
const client: MongoClient = new MongoClient(URI);

let dbConnection: MongoClient;

const dbConnect = async (callback: () => void) => {
  try {
    // Connect the client to the server
    dbConnection = await client.connect();
    console.log('Connected successfully to server');
    return callback();
  } catch (err) {
    // Ensures that the client will close when you finish/error
    console.log(err);
    throw err;
  }
};

const getDb = () => {
  if (dbConnection.db()) {
    return dbConnection.db();
  }
  throw 'No database found';
};

export { dbConnect, getDb };
