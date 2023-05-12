import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

import User from '../models/User';

config();

const registerUser = async (req: Request, res: Response) => {
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

    const payload = {
      email,
      fullName,
      password: passwordHash,
      contacts: [],
      areas: [],
      tasks: [],
      events: [],
    };

    const { insertedId } = await new User().registerUser(payload);
    return res.status(201).json({
      ...payload,
      id: insertedId,
      token: generateWebToken(insertedId.toString(), payload.fullName),
      msg: 'User Created',
    });
  } catch (error) {
    console.log(`Error registering user: ${error}`);
    return res.status(500).json({ error: 'Failed to register user' });
  }
};

const loginUser = async (req: Request, res: Response) => {
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

    const token = generateWebToken(user._id.toString(), user.fullName);

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

const deleteUser = async (req: Request, res: Response) => {
  if (!req.params) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    const { id } = req.params;
    const payload = new ObjectId(id);

    await new User().deleteUser(payload);
    res.status(200).json({ msg: `User deleted id: ${id}` });
  } catch (error) {
    console.log(`User not deleted: ${error}`);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

const generateWebToken = (id: string, userName: string) => {
  return jwt.sign({ id, userName }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JTW_EXPIRATION_TIME,
  });
};

export { deleteUser, registerUser, loginUser };
