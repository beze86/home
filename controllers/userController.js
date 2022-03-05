const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await new User().getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(`Users not found: ${error}`);
    res.status(500);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { userName } = req.body;
    const { insertedId } = await new User().createUser(userName);
    res.status(201).json({ insertedId });
  } catch (error) {
    console.log(`User not created: ${error}`);
    res.status(500);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await new User().deleteUser(id);
    res.status(200).json({ msg: `User deleted id: ${id}` });
  } catch (error) {
    console.log(`User not deleted: ${error}`);
    res.status(500);
  }
};
