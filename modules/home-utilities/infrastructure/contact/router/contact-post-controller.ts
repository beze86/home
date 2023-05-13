import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import UserApplication from '../../../../users/application/user';
import { ContactApplication } from '../../../application/contact/contactApplication';
import { CreateContact } from '../../../domain/contact/contact';

const createContact = (contactApp: ContactApplication, userApp: UserApplication) => async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Add missing fields' });
  }

  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const payload: CreateContact = {
    userId: new ObjectId(userId),
    name,
  };

  try {
    const { insertedId } = await contactApp.createContact(payload);

    await userApp.addContactToUser({ userId: payload.userId, contactId: insertedId });

    return res.status(201).json({ insertedId });
  } catch (error) {
    console.log(`Error creating contact: ${error}`);
    return res.status(500).json({ error: 'Failed to create contact' });
  }
};

export { createContact };
