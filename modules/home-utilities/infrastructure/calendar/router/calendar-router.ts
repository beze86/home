import { Router } from 'express';

import { deleteEvent } from './calendar-delete-controller';
import { getEvents } from './calendar-get-controller';
import { createEvent } from './calendar-post-controller';
import UserApplication from '../../../../users/application/user';
import UserRepository from '../../../../users/infrastructure/api/user-repository';
import CalendarApplication from '../../../application/calendar/calendarApplication';
import MongoCalendarRepository from '../api/calendar-repository';

const router = Router();

const calendarRepository = new MongoCalendarRepository();
const userRepository = new UserRepository();
const calendarApplication = new CalendarApplication(calendarRepository);
const userApplication = new UserApplication(userRepository);

const app = {
  get getEvents() {
    return getEvents(calendarApplication);
  },
  get createEvent() {
    return createEvent(calendarApplication, userApplication);
  },
  get deleteEvent() {
    return deleteEvent(calendarApplication, userApplication);
  },
};

router.route('/').get(app.getEvents).post(app.createEvent);
router.route('/:id').delete(app.deleteEvent);

export default router;
