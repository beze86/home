import { Router } from 'express';

import { deleteWeeklyTask } from './task-delete-controller';
import { getWeeklyTasks } from './task-get-controller';
import { createWeeklyTask } from './task-post-controller';
import UserApplication from '../../../../users/application/user';
import MongoUserRepository from '../../../../users/infrastructure/api/user-repository';
import AreaApplication from '../../../application/area/areaApplication';
import { ContactApplication } from '../../../application/contact/contactApplication';
import TaskApplication from '../../../application/task/taskApplication';
import MongoAreaRepository from '../../area/api/area-repository';
import MongoContactRepository from '../../contact/api/contact-repository';
import MongoTaskRepository from '../api/task-repository';

const router = Router();

const taskRepository = new MongoTaskRepository();
const areaRepository = new MongoAreaRepository();
const contactRepository = new MongoContactRepository();
const userRepository = new MongoUserRepository();
const taskApplication = new TaskApplication(taskRepository);
const areaApplication = new AreaApplication(areaRepository);
const contactApplication = new ContactApplication(contactRepository);
const userApplication = new UserApplication(userRepository);

const appTask = {
  get getWeeklyTasks() {
    return getWeeklyTasks(taskApplication);
  },
  get createWeeklyTask() {
    return createWeeklyTask(taskApplication, areaApplication, contactApplication, userApplication);
  },
  get deleteWeeklyTask() {
    return deleteWeeklyTask(taskApplication, userApplication);
  },
};

router.route('/').get(appTask.getWeeklyTasks).post(appTask.createWeeklyTask);

router.route('/:id').delete(appTask.deleteWeeklyTask);

export default router;
