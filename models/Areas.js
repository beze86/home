const { getDb } = require('../db');

class Areas {
  static getAllAreas() {
    const db = getDb();
    return db.collection('areas').find().toArray();
  }
}

module.exports = Areas;
