import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import CalendarApplication from '../../../application/calendar/calendarApplication';

const deleteEvent = (app: CalendarApplication) => async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const { id } = req.params;

  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const payload = {
    userId: new ObjectId(userId),
    id: new ObjectId(id),
  };

  try {
    await app.deleteEvent(payload);
    return res.status(200).json({ msg: `Event deleted id: ${payload.id}` });
  } catch (error) {
    console.log(`Error deleting event: ${error}`);
    return res.status(500).json({ error: 'Failed to delete event' });
  }
};

export { deleteEvent };
