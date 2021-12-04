const { getDb } = require('../db');

class Users {
  static getAllUsers() {
    const db = getDb();
    return db.collection('users').find().toArray();
  }
}

module.exports = Users;
