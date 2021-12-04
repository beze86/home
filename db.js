const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const URI = process.env.CONNECTION_STRING_REMOTE;

// Create a new MongoClient
const client = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

const dbConnect = async (callback) => {
  try {
    // Connect the client to the server
    dbConnection = await client.connect();
    console.log(dbConnection.db());
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

module.exports = {
  dbConnect,
  getDb,
};
