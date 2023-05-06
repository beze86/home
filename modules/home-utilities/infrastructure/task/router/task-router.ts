import { Router } from 'express';

import { deleteWeeklyTask } from './task-delete-controller';
import { getWeeklyTasks } from './task-get-controller';
import { createWeeklyTask } from './task-post-controller';
import TaskApplication from '../../../application/task/taskApplication';
import MongoAreaRepository from '../../area/api/area-repository';
import MongoContactRepository from '../../contact/api/contact-repository';
import MongoTaskRepository from '../api/task-repository';

const router = Router();

const taskRepository = new MongoTaskRepository();
const areaRepository = new MongoAreaRepository();
const contactRepository = new MongoContactRepository();
const taskApplication = new TaskApplication(taskRepository, areaRepository, contactRepository);

const appTask = {
  get getWeeklyTasks() {
    return getWeeklyTasks(taskApplication);
  },
  get createWeeklyTask() {
    return createWeeklyTask(taskApplication);
  },
  get deleteWeeklyTask() {
    return deleteWeeklyTask(taskApplication);
  },
};

router.route('/').get(appTask.getWeeklyTasks).post(appTask.createWeeklyTask);

router.route('/:id').delete(appTask.deleteWeeklyTask);

export default router;
