import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import CalendarApplication from '../../../application/calendar/calendarApplication';
import { GetEvents } from '../../../domain/calendar/calendar';

const getEvents = (app: CalendarApplication) => async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const payload: GetEvents = {
    userId: new ObjectId(userId),
  };

  try {
    const events = await app.getEvents(payload);

    if (!events) {
      return res.status(404).json({ error: 'Calendar events not found' });
    }

    res.status(200).json(events);
  } catch (error) {
    console.log(`Calendar events for user not found: ${error}`);
    res.status(500).json({ error: 'Failed to fetch calendar events' });
  }
};

export { getEvents };
