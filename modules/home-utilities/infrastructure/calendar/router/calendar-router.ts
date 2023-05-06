import { Router } from 'express';

import { deleteEvent } from './calendar-delete-controller';
import { getEvents } from './calendar-get-controller';
import { createEvent } from './calendar-post-controller';
import CalendarApplication from '../../../application/calendar/calendarApplication';
import MongoCalendarRepository from '../api/calendar-repository';

const router = Router();

const repository = new MongoCalendarRepository();
const application = new CalendarApplication(repository);

const app = {
  get getEvents() {
    return getEvents(application);
  },
  get createEvent() {
    return createEvent(application);
  },
  get deleteEvent() {
    return deleteEvent(application);
  },
};

router.route('/').get(app.getEvents).post(app.createEvent);
router.route('/:id').delete(app.deleteEvent);

export default router;
