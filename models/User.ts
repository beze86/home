import { Collection, InsertOneResult, ObjectId, WithId, Document } from 'mongodb';

import { AreaId } from './Area';
import { EventId } from './Calendar';
import { ContactId } from './Contact';
import { TaskId } from './Task';
import database from '../Database';

type UserId = ObjectId;

type RegisterUser = {
  email: string;
  fullName: string;
  password: string;
  contacts: ObjectId[];
  areas: ObjectId[];
  tasks: ObjectId[];
};

type ContactToUser = {
  userId: UserId;
  contactId: ContactId;
};

type AreaToUser = {
  userId: UserId;
  areaId: AreaId;
};

type TasksToUser = {
  userId: UserId;
  tasksId: TaskId;
};

type EventToUser = {
  userId: UserId;
  eventId: EventId;
};

interface UserInterface {
  collection: Collection;
  findUserByEmail: (data: string) => Promise<WithId<Document> | null>;
  deleteUser: (data: UserId) => Promise<void>;
  registerUser: (data: RegisterUser) => Promise<InsertOneResult<Document>>;
  addContactToUser: (data: ContactToUser) => Promise<void>;
  removeContactFromUser: (data: ContactToUser) => Promise<void>;
  addAreaToUser: (data: AreaToUser) => Promise<void>;
  removeAreaFromUser: (data: AreaToUser) => Promise<void>;
  addWeeklyTasksToUser: (data: TasksToUser) => Promise<void>;
  removeWeeklyTasksFromUser: (data: TasksToUser) => Promise<void>;
  addEventToUser: (data: EventToUser) => Promise<void>;
  removeEventFromUser: (data: EventToUser) => Promise<void>;
}

class User implements UserInterface {
  collection;

  constructor() {
    this.collection = database.get().collection('users');
  }

  async findUserByEmail(email: string) {
    return await this.collection.findOne({ email });
  }

  async deleteUser(id: UserId) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  async registerUser(data: RegisterUser) {
    return await this.collection.insertOne(data);
  }

  async addContactToUser({ userId, contactId }: ContactToUser) {
    await this.collection.updateOne({ _id: new ObjectId(userId) }, { $push: { contacts: contactId } });
  }

  async removeContactFromUser({ userId, contactId }: ContactToUser) {
    await this.collection.updateOne({ _id: new ObjectId(userId) }, { $pull: { contacts: { $in: [new ObjectId(contactId)] } } });
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
    await this.collection.updateOne({ _id: new ObjectId(userId) }, { $pull: { tasks: { $in: [new ObjectId(tasksId)] } } });
  }

  async addEventToUser({ userId, eventId }: EventToUser) {
    await this.collection.updateOne({ _id: new ObjectId(userId) }, { $push: { events: eventId } });
  }

  async removeEventFromUser({ userId, eventId }: EventToUser) {
    await this.collection.updateOne({ _id: new ObjectId(userId) }, { $pull: { events: { $in: [new ObjectId(eventId)] } } });
  }
}

export default User;
export type { UserId, RegisterUser };
