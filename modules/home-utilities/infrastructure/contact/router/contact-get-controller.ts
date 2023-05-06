import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import { ContactApplication } from '../../../application/contact/contactApplication';
import MongoContactRepository from '../api/contact-repository';

const repository = new MongoContactRepository();
const app = new ContactApplication(repository);

const getContacts = async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const userId = req.userId;

  const payload = {
    userId: new ObjectId(userId),
  };

  try {
    const contacts = await app.getContacts(payload);
    return res.status(201).json(contacts);
  } catch (error) {
    console.log(`Error fetching contacts for user: ${error}`);
    return res.status(500).json({ error: 'Failed to fetch contacts for user' });
  }
};

export { getContacts };
