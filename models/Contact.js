const BaseModel = require('./BaseModel');

class Contact extends BaseModel {
  constructor() {
    super('contacts');
  }

  getAllContacts() {
    return this.find();
  }

  deleteContact(id) {
    return this.deleteOne(id);
  }
  createContact(name) {
    return this.insertOne({ name });
  }
}

module.exports = Contact;
