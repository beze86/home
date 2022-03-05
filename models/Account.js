const BaseModel = require('./BaseModel');

class Account extends BaseModel {
  constructor() {
    super('accounts');
  }

  getAllAccounts() {
    return this.find();
  }

  deleteAccount(id) {
    return this.deleteOne(id);
  }
  createAccount(name) {
    return this.insertOne({ name });
  }
}

module.exports = Account;
