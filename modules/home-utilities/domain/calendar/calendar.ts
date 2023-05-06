import { ObjectId } from 'mongodb';

import { UserId } from '../../../../models/User';

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

type GetEvents = {
  userId: UserId;
};

type CreateEvent = {
  userId: UserId;
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
  borderColor: string;
  backgroundColor: string;
  note: string;
};

type DeleteEvent = {
  userId: UserId;
  id: EventId;
};

interface CalendarRepository {
  getEvents: (data: GetEvents) => Promise<EventResult[]>;
  createEvent: (data: CreateEvent) => Promise<void>;
  deleteEvent: (data: DeleteEvent) => Promise<void>;
}

export { GetEvents, EventResult, CreateEvent, DeleteEvent, CalendarRepository };
