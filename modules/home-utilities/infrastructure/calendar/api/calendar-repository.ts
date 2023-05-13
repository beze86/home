import { ObjectId } from 'mongodb';

import database from '../../../../../Database';
import { CalendarRepository, CreateEvent, DeleteEvent, EventResult, GetEvents } from '../../../domain/calendar/calendar';

class MongoCalendarRepository implements CalendarRepository {
  private readonly collection;

  constructor() {
    this.collection = database.get().collection('calendar');
  }

  getEvents({ userId }: GetEvents) {
    return this.collection.find<EventResult>({ userId }).toArray();
  }

  async createEvent({ userId, ...data }: CreateEvent) {
    return await this.collection.insertOne({ userId, ...data });
  }

  async deleteEvent({ id }: DeleteEvent) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}

export default MongoCalendarRepository;
