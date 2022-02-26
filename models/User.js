const { ObjectId } = require('mongodb');
const { getDb } = require('../db');

class User {
  collection;

  constructor() {
    this.collection = getDb().collection('users');
  }

  getAllUsers() {
    return this.collection.find().toArray();
  }

  deleteUser(id) {
    return this.collection.deleteOne({ _id: new ObjectId(id) });
  }
  createUser(userName) {
    return this.collection.insertOne({ user: userName });
  }
}

module.exports = User;
