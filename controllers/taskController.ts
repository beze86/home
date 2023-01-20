import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import Task from '../models/Task';

const getAllTasksByUser = async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const tasks = await new Task().getAllTasksByUser({ userId: req.userId });
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(`Error retrieving tasks: ${error}`);
    return res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

const createWeeklyTask = async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const insertedId = await new Task().createWeeklyTask({ userId: req.userId });
    return res.status(201).json({ insertedId });
  } catch (error) {
    console.log(`Error creating weekly task: ${error}`);
    return res.status(500).json({ error: 'Failed to create weekly task' });
  }
};

const deleteWeeklyTask = async (req: Request<{ id: ObjectId }>, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    await new Task().deleteWeeklyTask({ userId: req.userId, id: req.params.id });
    return res.status(200).json({ msg: `Weekly task deleted id: ${req.params.id}` });
  } catch (error) {
    console.log(`Error deleting weekly task: ${error}`);
    return res.status(500).json({ error: 'Failed to delete weekly task' });
  }
};

export { getAllTasksByUser, createWeeklyTask, deleteWeeklyTask };
