import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import AreaApplication from '../../../application/area/areaApplication';

const getAreas = (app: AreaApplication) => async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const payload = {
    userId: new ObjectId(userId),
  };

  try {
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
