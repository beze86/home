import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import Calendar, { CreateEvent } from '../models/Calendar';

const getEvents = async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const userId = req.userId;

  const userIdPayload = new ObjectId(userId);

  try {
    const events = await new Calendar().getEvents(userIdPayload);
    if (!events) {
      return res.status(404).json({ error: 'Calendar events not found' });
    }

    res.status(200).json(events);
  } catch (error) {
    console.log(`Calendar events for user not found: ${error}`);
    res.status(500).json({ error: 'Failed to fetch calendar events' });
  }
};

const createEvent = async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const userId = req.userId;

  if (!req.body) {
    return res.status(400).json({ error: 'Event details are required' });
  }

  const { allDay, title, start, end, textColor, backgroundColor, note } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Add missing title' });
  }

  const payload: CreateEvent = {
    userId: new ObjectId(userId),
    allDay,
    title,
    start,
    end,
    textColor,
    backgroundColor,
    note,
  };

  try {
    const insertedId = await new Calendar().createEvent(payload);
    res.status(201).json({ insertedId });
  } catch (error) {
    console.log(`Event not created: ${error}`);
    res.status(500).json({ error: 'Failed to create Event' });
  }
};

export { createEvent, getEvents };
