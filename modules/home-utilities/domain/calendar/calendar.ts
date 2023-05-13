import { InsertOneResult, ObjectId } from 'mongodb';

import { UserId } from '../../../users/domain/user';

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
  id: EventId;
};

interface CalendarRepository {
  getEvents: (data: GetEvents) => Promise<EventResult[]>;
  createEvent: (data: CreateEvent) => Promise<InsertOneResult>;
  deleteEvent: (data: DeleteEvent) => Promise<void>;
}

export { EventId, GetEvents, EventResult, CreateEvent, DeleteEvent, CalendarRepository };
