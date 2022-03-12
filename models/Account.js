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
  createAccount(data) {
    return this.insertOne(data);
  }
}

module.exports = Account;
