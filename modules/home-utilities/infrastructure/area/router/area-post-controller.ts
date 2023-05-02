import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import AreaApplication from '../../../application/area/areaApplication';
import MongoAreaRepository from '../api/area-repository';

const createArea = async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const userId = req.userId;

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
    const repository = new MongoAreaRepository();
    const app = new AreaApplication(repository);
    const insertedId = await app.createArea(payload);
    res.status(201).json({ insertedId });
  } catch (error) {
    console.log(`Area not created: ${error}`);
    res.status(500).json({ error: 'Failed to create area' });
  }
};

export { createArea };
