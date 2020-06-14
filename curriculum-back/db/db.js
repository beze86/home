const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const URI = 'mongodb://localhost:27017/faradayTest';

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(URI, options)
    .then((client) => {
        console.log('Connected');
        _db = client.db();
        callback();
    })
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'Database not found';
}


module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;