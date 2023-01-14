const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/User');

exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName | !email | !password) {
      res.status(400).json({ error: 'Add missing fields' });
      throw new Error('Add missing fields');
    }

    const user = await new User().findUserByEmail(email);
    if (user) {
      res.status(400).json({ error: 'User already exists' });
      throw new Error('User already exists');
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
    res.status(201).json({
      ...userPayload,
      id: insertedId,
      token: generateWebToken(insertedId, userPayload.fullName),
      msg: 'User Created',
    });
  } catch (error) {
    console.log(`${error}`);
    res.status(500);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email | !password) {
      res.status(400).json({ error: 'Add missing fields' });
      throw new Error('Add missing fields');
    }

    const user = await new User().findUserByEmail(email);
    if (!user) {
      res.status(400).json({ error: 'Invalid credentials' });
      throw new Error('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(400).json({ error: 'Invalid credentials' });
      throw new Error('Invalid credentials');
    }

    const token = generateWebToken(user._id, user.fullName);

    const userPayload = {
      id: user._id,
      email,
      fullName: user.fullName,
      token,
    };

    res.status(200).json({
      ...userPayload,
      msg: 'User logged in',
    });
  } catch (error) {
    console.log(`${error}`);
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

const generateWebToken = (id, userName) => {
  return jwt.sign({ id, userName }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JTW_EXPIRATION_TIME,
  });
};
