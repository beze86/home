const BaseModel = require('./BaseModel');
const { ObjectId } = require('mongodb');

class User extends BaseModel {
  constructor() {
    super('users');
  }

  getAllUsers() {
    return this.find();
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

  async addContactToUser({ userId, insertedId }) {
    return this.collection.updateOne({ _id: new ObjectId(userId) }, { $push: { contacts: insertedId } });
  }

  removeContactFromUser({ userId, contactId }) {
    return this.collection.updateOne({ _id: new ObjectId(userId) }, { $pull: { contacts: { $in: [new ObjectId(contactId)] } } });
  }
}

module.exports = User;
