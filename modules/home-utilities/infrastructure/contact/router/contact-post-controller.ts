import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import Contact from '../../../../../models/Contact';
import { ContactApplication } from '../../../application/contact/contactApplication';
import MongoContactRepository from '../api/contact-repository';

const repository = new MongoContactRepository();
const app = new ContactApplication(repository);

const createContact = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Add missing fields' });
  }

  if (!req.userId) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const userId = req.userId;

  const payload = {
    userId: new ObjectId(userId),
    name,
  };

  try {
    const insertedId = await app.createContact(payload);
    return res.status(201).json({ insertedId });
  } catch (error) {
    console.log(`Error creating contact: ${error}`);
    return res.status(500).json({ error: 'Failed to create contact' });
  }
};

export { createContact };
