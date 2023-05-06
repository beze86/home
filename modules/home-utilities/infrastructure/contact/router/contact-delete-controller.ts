import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import { ContactApplication } from '../../../application/contact/contactApplication';
import MongoContactRepository from '../api/contact-repository';

const repository = new MongoContactRepository();
const app = new ContactApplication(repository);

const deleteContact = async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const { id } = req.params;

  if (!req.userId) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const userId = req.userId;

  const payload = {
    userId: new ObjectId(userId),
    id: new ObjectId(id),
  };

  try {
    await app.deleteContact(payload);
    return res.status(200).json({ msg: `Contact deleted id: ${payload.id}` });
  } catch (error) {
    console.log(`Error deleting contact: ${error}`);
    return res.status(500).json({ error: 'Failed to delete contact' });
  }
};

export { deleteContact };
