const { getDb } = require('../db');

class Task {
  static getAllTasks() {
    const db = getDb();
    return db.collection('tasks').find().toArray();
  }
}

module.exports = Task;
