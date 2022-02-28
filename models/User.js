const BaseModel = require('./BaseModel');

class User extends BaseModel {
  constructor() {
    super('users');
  }

  getAllUsers() {
    return this.find();
  }

  deleteUser(id) {
    return this.deleteOne(id);
  }
  createUser(userName) {
    return this.insertOne({ user: userName });
  }
}

module.exports = User;
