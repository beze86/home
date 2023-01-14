const { getDb } = require('../db');
const { ObjectId } = require('mongodb');

class BaseModel {
  collection;

  constructor(collectionName) {
    this.collection = getDb().collection(collectionName);
  }

  find() {
    return this.collection.find().toArray();
  }

  findByUserId(query) {
    return this.collection.find(query).toArray();
  }

  findOne(query) {
    return this.collection.findOne(query);
  }

  deleteOne(id) {
    return this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  insertOne(query) {
    return this.collection.insertOne(query);
  }
}

module.exports = BaseModel;
