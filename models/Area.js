const BaseModel = require('./BaseModel');
const { ObjectId } = require('mongodb');
const User = require('./User');

class Area extends BaseModel {
  constructor() {
    super('areas');
  }

  getAllAreasByUser({ userId }) {
    return this.find({ userId: new ObjectId(userId) });
  }

  async deleteArea({ userId, id }) {
    await this.deleteOne(id);
    return new User().removeAreaFromUser({ userId, areaId: id });
  }

  async createArea({ userId, area }) {
    const { insertedId } = await this.insertOne({ userId: new ObjectId(userId), area });
    await new User().addAreaToUser({ userId, areaId: insertedId });
    return insertedId;
  }
}

module.exports = Area;
