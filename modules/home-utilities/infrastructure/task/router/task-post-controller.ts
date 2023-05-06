import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import TaskApplication from '../../../application/task/taskApplication';

const createWeeklyTask = (app: TaskApplication) => async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const payload = {
    userId: new ObjectId(userId),
  };

  try {
    const insertedId = await app.createWeeklyTask(payload);
    return res.status(201).json({ insertedId });
  } catch (error) {
    console.log(`Error creating weekly task: ${error}`);
    return res.status(500).json({ error: 'Failed to create weekly task' });
  }
};

export { createWeeklyTask };
