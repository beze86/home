import { genSalt, hash, compare } from 'bcryptjs';
import { Request, Response } from 'express';

import { generateWebToken } from '../../../web-token/application/web-token';
import UserApplication from '../../application/user';
import { RegisterUser } from '../../domain/user';

const registerUser = (app: UserApplication) => async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'Add missing fields' });
  }

  try {
    const user = await app.getUserByEmail({ email });

    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await genSalt(10);

    const passwordHash = await hash(password, salt);

    const payload: RegisterUser = {
      email,
      fullName,
      password: passwordHash,
      contacts: [],
      areas: [],
      tasks: [],
      events: [],
    };

    const { insertedId } = await app.registerUser(payload);

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

const loginUser = (app: UserApplication) => async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Add missing fields' });
  }

  try {
    const user = await app.getUserByEmail({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await compare(password, user.password);

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

export { registerUser, loginUser };
