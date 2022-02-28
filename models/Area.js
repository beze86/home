const BaseModel = require('./BaseModel');

class Area extends BaseModel {
  constructor() {
    super('areas');
  }

  getAllAreas() {
    return this.find();
  }

  deleteArea(id) {
    return this.deleteOne(id);
  }
  createArea(areaName) {
    return this.insertOne(areaName);
  }
}

module.exports = Area;
