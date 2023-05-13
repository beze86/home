import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import UserApplication from '../../../../users/application/user';
import AreaApplication from '../../../application/area/areaApplication';
import { CreateArea } from '../../../domain/area/area';

const createArea = (areaApp: AreaApplication, userApp: UserApplication) => async (req: Request, res: Response) => {
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

  const payload: CreateArea = {
    userId: new ObjectId(userId),
    area,
  };

  try {
    const { insertedId } = await areaApp.createArea(payload);

    await userApp.addAreaToUser({ userId: payload.userId, areaId: insertedId });

    res.status(201).json({ insertedId });
  } catch (error) {
    console.log(`Area not created: ${error}`);
    res.status(500).json({ error: 'Failed to create area' });
  }
};

export { createArea };
