import { ObjectId } from 'mongodb';

import database from '../../../../Database';
import {
  AreaToUser,
  ContactToUser,
  DeleteUser,
  EventToUser,
  GetByEmail,
  RegisterUser,
  TasksToUser,
  UserRepository,
} from '../../domain/user';

class MongoUserRepository implements UserRepository {
  collection;

  constructor() {
    this.collection = database.get().collection('users');
  }

  getUserByEmail({ email }: GetByEmail) {
    return this.collection.findOne({ email });
  }

  async deleteUser({ id }: DeleteUser) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  registerUser(data: RegisterUser) {
    return this.collection.insertOne(data);
  }

  async addContactToUser({ userId, contactId }: ContactToUser) {
    await this.collection.updateOne({ _id: new ObjectId(userId) }, { $push: { contacts: contactId } });
  }

  async removeContactFromUser({ userId, contactId }: ContactToUser) {
    await this.collection.updateOne({ _id: new ObjectId(userId) }, { $pull: { contacts: { $in: [contactId] } } });
  }

  async addAreaToUser({ userId, areaId }: AreaToUser) {
    await this.collection.updateOne({ _id: new ObjectId(userId) }, { $push: { areas: areaId } });
  }

  async removeAreaFromUser({ userId, areaId }: AreaToUser) {
    await this.collection.updateOne({ _id: new ObjectId(userId) }, { $pull: { areas: { $in: [areaId] } } });
  }

  async addWeeklyTasksToUser({ userId, tasksId }: TasksToUser) {
    await this.collection.updateOne({ _id: new ObjectId(userId) }, { $push: { tasks: tasksId } });
  }

  async removeWeeklyTasksFromUser({ userId, tasksId }: TasksToUser) {
    await this.collection.updateOne({ _id: new ObjectId(userId) }, { $pull: { tasks: { $in: [tasksId] } } });
  }

  async addEventToUser({ userId, eventId }: EventToUser) {
    await this.collection.updateOne({ _id: new ObjectId(userId) }, { $push: { events: eventId } });
  }

  async removeEventFromUser({ userId, eventId }: EventToUser) {
    await this.collection.updateOne({ _id: new ObjectId(userId) }, { $pull: { events: { $in: [eventId] } } });
  }
}

export default MongoUserRepository;
