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
  createArea(area) {
    return this.insertOne(area);
  }
}

module.exports = Area;
