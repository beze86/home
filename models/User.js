const BaseModel = require('./BaseModel');

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
}

module.exports = User;
