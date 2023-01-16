const BaseModel = require('./BaseModel');
const { ObjectId } = require('mongodb');

class User extends BaseModel {
  constructor() {
    super('users');
  }

  findUserByEmail(email) {
    return this.findOne({ email });
  }

  deleteUser(id) {
    return this.deleteOne(id);
  }

  registerUser(newUserData) {
    return this.insertOne(newUserData);
  }

  async addContactToUser({ userId, contactId }) {
    return this.collection.updateOne({ _id: new ObjectId(userId) }, { $push: { contacts: contactId } });
  }

  removeContactFromUser({ userId, contactId }) {
    return this.collection.updateOne({ _id: new ObjectId(userId) }, { $pull: { contacts: { $in: [new ObjectId(contactId)] } } });
  }

  async addAreaToUser({ userId, areaId }) {
    return this.collection.updateOne({ _id: new ObjectId(userId) }, { $push: { areas: areaId } });
  }

  removeAreaFromUser({ userId, areaId }) {
    return this.collection.updateOne({ _id: new ObjectId(userId) }, { $pull: { areas: { $in: [new ObjectId(areaId)] } } });
  }

  async addWeeklyTasksToUser({ userId, tasksId }) {
    return this.collection.updateOne({ _id: new ObjectId(userId) }, { $push: { tasks: tasksId } });
  }

  removeWeeklyTasksFromUser({ userId, tasksId }) {
    return this.collection.updateOne({ _id: new ObjectId(userId) }, { $pull: { tasks: { $in: [new ObjectId(tasksId)] } } });
  }
}

module.exports = User;
