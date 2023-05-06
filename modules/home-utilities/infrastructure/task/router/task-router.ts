import { Router } from 'express';

import { deleteWeeklyTask } from './task-delete-controller';
import { getWeeklyTasks } from './task-get-controller';
import { createWeeklyTask } from './task-post-controller';
import TaskApplication from '../../../application/task/taskApplication';
import MongoTaskRepository from '../api/task-repository';

const router = Router();

const repository = new MongoTaskRepository();
const application = new TaskApplication(repository);

const app = {
  get getWeeklyTasks() {
    return getWeeklyTasks(application);
  },
  get createWeeklyTask() {
    return createWeeklyTask(application);
  },
  get deleteWeeklyTask() {
    return deleteWeeklyTask(application);
  },
};

router.route('/').get(app.getWeeklyTasks).post(app.createWeeklyTask);

router.route('/:id').delete(app.deleteWeeklyTask);

export default router;
