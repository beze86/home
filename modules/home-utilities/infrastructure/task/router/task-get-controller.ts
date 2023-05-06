import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import TaskApplication from '../../../application/task/taskApplication';

const getWeeklyTasks = (app: TaskApplication) => async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const payload = {
    userId: new ObjectId(userId),
  };

  try {
    const tasks = await app.getWeeklyTasks(payload);
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(`Error retrieving tasks: ${error}`);
    return res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

export { getWeeklyTasks };
