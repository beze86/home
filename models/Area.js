const { ObjectId } = require('mongodb');
const { getDb } = require('../db');

class Area {
  collection;

  constructor() {
    this.collection = getDb().collection('areas');
  }

  getAllAreas() {
    return this.collection.find().toArray();
  }

  deleteArea(id) {
    return this.collection.deleteOne({ _id: new ObjectId(id) });
  }
  createArea(areaName) {
    return this.collection.insertOne({ area: areaName });
  }
}

module.exports = Area;
