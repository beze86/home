import { Router } from 'express';

import { createEvent, deleteEvent, getEvents } from '../controllers/calendarController';

const router = Router();

router.route('/').get(getEvents).post(createEvent);
router.route('/:id').delete(deleteEvent);

export default router;
