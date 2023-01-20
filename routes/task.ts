import { Router } from 'express';

import { getAllTasksByUser, createWeeklyTask, deleteWeeklyTask } from '../controllers/taskController';

const router = Router();

router.route('/').get(getAllTasksByUser).post(createWeeklyTask);

router.route('/:id').delete(deleteWeeklyTask);

export default router;
