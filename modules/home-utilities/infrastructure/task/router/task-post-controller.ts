import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import UserApplication from '../../../../users/application/user';
import AreaApplication from '../../../application/area/areaApplication';
import { ContactApplication } from '../../../application/contact/contactApplication';
import TaskApplication from '../../../application/task/taskApplication';
import { GetWeeklyTasksAreasAndContacts } from '../../../domain/task/task';

const createWeeklyTask =
  (taskApp: TaskApplication, areaApp: AreaApplication, contactApp: ContactApplication, userApp: UserApplication) =>
  async (req: Request, res: Response) => {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userObjectId = new ObjectId(userId);

    try {
      const areas = await areaApp.getAreas({ userId: userObjectId });
      const contacts = await contactApp.getContacts({ userId: userObjectId });

      const payload: GetWeeklyTasksAreasAndContacts = {
        userId: userObjectId,
        areas,
        contacts,
      };
      const { insertedId } = await taskApp.createWeeklyTask(payload);
      await userApp.addWeeklyTasksToUser({ userId: payload.userId, tasksId: insertedId });

      return res.status(201).json({ insertedId });
    } catch (error) {
      console.log(`Error creating weekly task: ${error}`);
      return res.status(500).json({ error: 'Failed to create weekly task' });
    }
  };

export { createWeeklyTask };
