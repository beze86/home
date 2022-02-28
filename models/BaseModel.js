const { ObjectId } = require('mongodb');

const { getDb } = require('../db');

class BaseModel {
  collection;

  constructor(collectionName) {
    this.collection = getDb().collection(collectionName);
  }

  find() {
    return this.collection.find().toArray();
  }

  deleteOne(id) {
    return this.collection.deleteOne({ _id: new ObjectId(id) });
  }
  insertOne(query) {
    return this.collection.insertOne(query);
  }
}

module.exports = BaseModel;
