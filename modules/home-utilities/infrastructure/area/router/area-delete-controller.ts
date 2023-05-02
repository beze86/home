import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import AreaApplication from '../../../application/area/areaApplication';
import MongoAreaRepository from '../api/area-repository';

const deleteArea = async (req: Request, res: Response) => {
  if (!req.params || !req.params.id) {
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
    const repository = new MongoAreaRepository();
    const app = new AreaApplication(repository);
    await app.deleteArea(payload);
    res.status(200).json({ msg: `Area deleted id: ${payload.id}` });
  } catch (error) {
    console.log(`Area not deleted: ${error}`);
    res.status(500).json({ error: 'Failed to delete Area' });
  }
};

export { deleteArea };
