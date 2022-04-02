const Account = require('../models/Account');

exports.getAllAccounts = async (req, res) => {
  try {
    const areas = await new Account().getAllAccounts();
    res.status(200).json(areas);
  } catch (error) {
    console.log(`Users not found: ${error}`);
    res.status(500);
  }
};

exports.createAccount = async (req, res) => {
  try {
    const { name } = req.body;
    const { insertedId } = await new Account().createAccount(name);
    res.status(201).json({ insertedId });
  } catch (error) {
    console.log(`Account not created: ${error}`);
    res.status(500);
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    await new Account().deleteAccount(id);
    res.status(200).json({ msg: `Account deleted id: ${id}` });
  } catch (error) {
    console.log(`Account not deleted: ${error}`);
    res.status(500);
  }
};
