import exp from 'constants';

import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import TaskApplication from '../../../application/task/taskApplication';

const deleteWeeklyTask = (app: TaskApplication) => async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const userId = req.userId;

  if (!req.params || !req.params.id) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const { id } = req.params;

  const payload = {
    userId: new ObjectId(userId),
    id: new ObjectId(id),
  };

  try {
    await app.deleteWeeklyTask(payload);
    return res.status(200).json({ msg: `Weekly task deleted id: ${req.params.id}` });
  } catch (error) {
    console.log(`Error deleting weekly task: ${error}`);
    return res.status(500).json({ error: 'Failed to delete weekly task' });
  }
};

export { deleteWeeklyTask };
