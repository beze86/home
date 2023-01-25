import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import Contact from '../models/Contact';

const getAllContactsByUser = async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const userId = req.userId;

  try {
    const contacts = await new Contact().getAllContactsByUser({ userId });
    return res.status(201).json(contacts);
  } catch (error) {
    console.log(`Error fetching contacts for user: ${error}`);
    return res.status(500).json({ error: 'Failed to fetch contacts for user' });
  }
};

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
    userId,
    name,
  };
  try {
    const insertedId = await new Contact().createContact(payload);
    return res.status(201).json({ insertedId });
  } catch (error) {
    console.log(`Error creating contact: ${error}`);
    return res.status(500).json({ error: 'Failed to create contact' });
  }
};

const deleteContact = async (req: Request<{ id: ObjectId }>, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const { id } = req.params;
  if (!req.userId) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const userId = req.userId;
  const payload = {
    userId,
    id,
  };
  try {
    await new Contact().deleteContact(payload);
    return res.status(200).json({ msg: `Contact deleted id: ${payload.id}` });
  } catch (error) {
    console.log(`Error deleting contact: ${error}`);
    return res.status(500).json({ error: 'Failed to delete contact' });
  }
};

export { deleteContact, getAllContactsByUser, createContact };
