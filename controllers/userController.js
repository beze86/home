const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/User');

exports.registerUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'Add missing fields' });
  }

  try {
    const user = await new User().findUserByEmail(email);
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const userPayload = {
      email,
      fullName,
      password: passwordHash,
      contacts: [],
      areas: [],
    };

    const { insertedId } = await new User().registerUser(userPayload);
    return res.status(201).json({
      ...userPayload,
      id: insertedId,
      token: generateWebToken(insertedId, userPayload.fullName),
      msg: 'User Created',
    });
  } catch (error) {
    console.log(`Error registering user: ${error}`);
    return res.status(500).json({ error: 'Failed to register user' });
  }
};

exports.loginUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Add missing fields' });
  }

  try {
    const user = await new User().findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateWebToken(user._id, user.fullName);

    const userPayload = {
      id: user._id,
      email,
      fullName: user.fullName,
      token,
    };

    return res.status(200).json({
      ...userPayload,
      msg: 'User logged in',
    });
  } catch (error) {
    console.log(`Error logging in user: ${error}`);
    return res.status(500).json({ error: 'Failed to login user' });
  }
};

exports.deleteUser = async (req, res) => {
  if (!req.params) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    const { id } = req.params;
    // todo to be implemented
    // const user = await new User().getUser(id);
    // if (!user) {
    //   res.status(404).json({ error: { code: 'user_not_found', message: 'User not found' } });
    //   return;
    // }
    await new User().deleteUser(id);
    res.status(200).json({ msg: `User deleted id: ${id}` });
  } catch (error) {
    console.log(`User not deleted: ${error}`);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

const generateWebToken = (id, userName) => {
  return jwt.sign({ id, userName }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JTW_EXPIRATION_TIME,
  });
};
