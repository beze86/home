import { ObjectId } from 'mongodb';

import database from '../../../../../Database';
import { CreateEvent } from '../../../../../models/Calendar';
import User from '../../../../../models/User';
import { CalendarRepository, DeleteEvent, EventResult, GetEvents } from '../../../domain/calendar/calendar';

class MongoCalendarRepository implements CalendarRepository {
  private readonly collection;

  constructor() {
    this.collection = database.get().collection('calendar');
  }

  getEvents({ userId }: GetEvents) {
    return this.collection.find<EventResult>({ userId }).toArray();
  }

  async createEvent({ userId, ...data }: CreateEvent) {
    const { insertedId } = await this.collection.insertOne({ userId, ...data });
    await new User().addEventToUser({ userId, eventId: insertedId });
  }

  async deleteEvent({ userId, id }: DeleteEvent) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
    await new User().removeEventFromUser({ userId, eventId: id });
  }
}

export default MongoCalendarRepository;
