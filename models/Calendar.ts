import { Collection, ObjectId } from 'mongodb';

import User, { UserId } from './User';
import database from '../Database';

type EventId = ObjectId;

type EventResult = {
  _id: EventId;
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
  textColor: string;
  backgroundColor: string;
  note: string;
};

type CreateEvent = {
  userId: UserId;
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
  textColor: string;
  backgroundColor: string;
  note: string;
};

interface CalendarInterface {
  collection: Collection;
  getEvents: (userId: UserId) => Promise<EventResult[]>;
  createEvent: (data: CreateEvent) => Promise<void>;
}

class Calendar implements CalendarInterface {
  collection;

  constructor() {
    this.collection = database.getDb().collection('calendar');
  }

  getEvents(userId: UserId) {
    return this.collection.find<EventResult>({ userId: new ObjectId(userId) }).toArray();
  }

  async createEvent({ userId, ...data }: CreateEvent) {
    const { insertedId } = await this.collection.insertOne({ userId: new ObjectId(userId), ...data });
    await new User().addAreaToUser({ userId, areaId: insertedId });
  }
}

export default Calendar;
export type { EventId, CreateEvent };
