import { Router } from 'express';

import { createEvent, getEvents } from '../controllers/calendarController';

const router = Router();

router.route('/').get(getEvents).post(createEvent);

export default router;
