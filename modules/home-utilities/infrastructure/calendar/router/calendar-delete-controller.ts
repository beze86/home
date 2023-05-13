import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import UserApplication from '../../../../users/application/user';
import CalendarApplication from '../../../application/calendar/calendarApplication';
import { DeleteEvent } from '../../../domain/calendar/calendar';

const deleteEvent = (calendarApp: CalendarApplication, userApp: UserApplication) => async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const { id } = req.params;

  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const userObjectId = new ObjectId(userId);

  const payload: DeleteEvent = {
    id: new ObjectId(id),
  };

  try {
    await calendarApp.deleteEvent(payload);
    await userApp.removeEventFromUser({ userId: userObjectId, eventId: payload.id });

    return res.status(200).json({ msg: `Event deleted id: ${payload.id}` });
  } catch (error) {
    console.log(`Error deleting event: ${error}`);
    return res.status(500).json({ error: 'Failed to delete event' });
  }
};

export { deleteEvent };
