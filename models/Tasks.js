const { getDb } = require('../db');

class Tasks {
  static getAllTasks() {
    const db = getDb();
    return db.collection('tasks').find().toArray();
  }
}

module.exports = Tasks;
