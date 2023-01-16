const BaseModel = require('./BaseModel');
const User = require('./User');
const { ObjectId } = require('mongodb');

class Contact extends BaseModel {
  constructor() {
    super('contacts');
  }

  getAllContactsByUser({ userId }) {
    return this.find({ userId: new ObjectId(userId) });
  }

  async deleteContact({ userId, id }) {
    await this.deleteOne(id);
    return new User().removeContactFromUser({ userId, contactId: id });
  }

  async createContact({ userId, fullName }) {
    const { insertedId } = await this.insertOne({ userId: new ObjectId(userId), fullName });
    await new User().addContactToUser({ userId, contactId: insertedId });
    return insertedId;
  }
}

module.exports = Contact;
