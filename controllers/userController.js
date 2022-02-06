const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.log(`get users error: ${err}`);
    res.status(500);
  }
};

exports.createUser = (req, res) => {
  res.send('create user');
};

exports.getUser = (req, res) => {
  res.send('get user');
};

exports.updateUser = (req, res) => {
  res.send('update user');
};

exports.deleteUser = (req, res) => {
  res.send('delete user');
};
