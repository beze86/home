import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import AreaApplication from '../../../application/area/areaApplication';
import MongoAreaRepository from '../api/area-repository';

const getAreas = async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const userId = req.userId;

  const payload = {
    userId: new ObjectId(userId),
  };

  try {
    const repository = new MongoAreaRepository();
    const app = new AreaApplication(repository);
    const areas = await app.getAreas(payload);
    if (!areas) {
      return res.status(404).json({ error: 'Areas not found' });
    }

    res.status(200).json(areas);
  } catch (error) {
    console.log(`Areas for user not found: ${error}`);
    res.status(500).json({ error: 'Failed to fetch areas' });
  }
};

export { getAreas };
