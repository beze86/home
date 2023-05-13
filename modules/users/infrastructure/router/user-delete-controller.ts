import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import UserApplication from '../../application/user';
import { DeleteUser } from '../../domain/user';

const deleteUser = (app: UserApplication) => async (req: Request, res: Response) => {
  if (!req.params) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    const { id } = req.params;

    const payload: DeleteUser = {
      id: new ObjectId(id),
    };

    await app.deleteUser(payload);
    res.status(200).json({ msg: `User deleted id: ${id}` });
  } catch (error) {
    console.log(`User not deleted: ${error}`);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

export { deleteUser };
