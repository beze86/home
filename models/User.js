const { getDb } = require('../db');

class User {
  static getAllUsers() {
    const db = getDb();
    return db.collection('users').find().toArray();
  }
}

module.exports = User;
