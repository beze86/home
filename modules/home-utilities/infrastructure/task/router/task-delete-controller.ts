import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import UserApplication from '../../../../users/application/user';
import TaskApplication from '../../../application/task/taskApplication';
import { DeleteWeeklyTask } from '../../../domain/task/task';

const deleteWeeklyTask = (taskApp: TaskApplication, userApp: UserApplication) => async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!req.params || !req.params.id) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const { id } = req.params;

  const userObjectId = new ObjectId(userId);

  const payload: DeleteWeeklyTask = {
    id: new ObjectId(id),
  };

  try {
    await taskApp.deleteWeeklyTask(payload);
    await userApp.removeWeeklyTasksFromUser({ userId: userObjectId, tasksId: payload.id });

    return res.status(200).json({ msg: `Weekly task deleted id: ${req.params.id}` });
  } catch (error) {
    console.log(`Error deleting weekly task: ${error}`);
    return res.status(500).json({ error: 'Failed to delete weekly task' });
  }
};

export { deleteWeeklyTask };
