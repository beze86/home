import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import AreaApplication from '../../../application/area/areaApplication';

const createArea = (app: AreaApplication) => async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  if (!req.body) {
    return res.status(400).json({ error: 'Area name is required' });
  }

  const { area } = req.body;

  if (!area) {
    return res.status(400).json({ error: 'Add missing fields' });
  }

  const payload = {
    userId: new ObjectId(userId),
    area,
  };

  try {
    const insertedId = await app.createArea(payload);
    res.status(201).json({ insertedId });
  } catch (error) {
    console.log(`Area not created: ${error}`);
    res.status(500).json({ error: 'Failed to create area' });
  }
};

export { createArea };
