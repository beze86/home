import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import CalendarApplication from '../../../application/calendar/calendarApplication';
import { CreateEvent } from '../../../domain/calendar/calendar';

const createEvent = (app: CalendarApplication) => async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  if (!req.body) {
    return res.status(400).json({ error: 'Event details are required' });
  }

  const { allDay, title, start, end, borderColor, backgroundColor, note } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Add missing title' });
  }

  const payload: CreateEvent = {
    userId: new ObjectId(userId),
    allDay,
    title,
    start,
    end,
    borderColor,
    backgroundColor,
    note,
  };

  try {
    const insertedId = await app.createEvent(payload);
    res.status(201).json({ insertedId });
  } catch (error) {
    console.log(`Event not created: ${error}`);
    res.status(500).json({ error: 'Failed to create Event' });
  }
};

export { createEvent };
