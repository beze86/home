import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import AreaApplication from '../../../application/area/areaApplication';
import { DeleteArea } from '../../../domain/area/area';

const deleteArea = (app: AreaApplication) => async (req: Request, res: Response) => {
  if (!req.params || !req.params.id) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const { id } = req.params;

  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const payload: DeleteArea = {
    userId: new ObjectId(userId),
    id: new ObjectId(id),
  };

  try {
    await app.deleteArea(payload);
    res.status(200).json({ msg: `Area deleted id: ${payload.id}` });
  } catch (error) {
    console.log(`Area not deleted: ${error}`);
    res.status(500).json({ error: 'Failed to delete Area' });
  }
};

export { deleteArea };
