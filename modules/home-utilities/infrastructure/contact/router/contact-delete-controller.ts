import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import UserApplication from '../../../../users/application/user';
import { ContactApplication } from '../../../application/contact/contactApplication';
import { DeleteContact } from '../../../domain/contact/contact';

const deleteContact = (contactApp: ContactApplication, userApp: UserApplication) => async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const { id } = req.params;

  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const userObjectId = new ObjectId(userId);

  const payload: DeleteContact = {
    id: new ObjectId(id),
  };

  try {
    await contactApp.deleteContact(payload);
    await userApp.removeContactFromUser({ userId: userObjectId, contactId: payload.id });

    return res.status(200).json({ msg: `Contact deleted id: ${payload.id}` });
  } catch (error) {
    console.log(`Error deleting contact: ${error}`);
    return res.status(500).json({ error: 'Failed to delete contact' });
  }
};

export { deleteContact };
