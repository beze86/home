import { Collection, DeleteResult, InsertOneResult, ObjectId, UpdateResult, WithId } from 'mongodb';

import database from '../Database';

type UserId = ObjectId;

type RegisterUserType = {
  email: string;
  fullName: string;
  password: string;
  contacts: [];
  areas: [];
  tasks: [];
};

type ContactToUserType = {
  userId: UserId;
  contactId: ObjectId;
};

type AreaToUserType = {
  userId: UserId;
  areaId: ObjectId;
};

type TasksToUserType = {
  userId: UserId;
  tasksId: ObjectId;
};

interface UserInterface {
  collection: Collection;
  findUserByEmail: (data: string) => Promise<WithId<Document> | null>;
  deleteUser: (data: UserId) => Promise<DeleteResult>;
  registerUser: (data: RegisterUserType) => Promise<InsertOneResult<Document>>;
  addContactToUser: (data: ContactToUserType) => Promise<UpdateResult>;
  removeContactFromUser: (data: ContactToUserType) => Promise<UpdateResult>;
  addAreaToUser: (data: AreaToUserType) => Promise<UpdateResult>;
  removeAreaFromUser: (data: AreaToUserType) => Promise<UpdateResult>;
  addWeeklyTasksToUser: (data: TasksToUserType) => Promise<UpdateResult>;
  removeWeeklyTasksFromUser: (data: TasksToUserType) => Promise<UpdateResult>;
}

class User implements UserInterface {
  collection;

  constructor() {
    this.collection = database.getDb().collection('users');
  }

  findUserByEmail(email: string) {
    return this.collection.findOne({ email });
  }

  deleteUser(id: UserId) {
    return this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  registerUser(data: RegisterUserType) {
    return this.collection.insertOne(data);
  }

  async addContactToUser({ userId, contactId }: ContactToUserType) {
    return this.collection.updateOne({ _id: new ObjectId(userId) }, { $push: { contacts: contactId } });
  }

  removeContactFromUser({ userId, contactId }: ContactToUserType) {
    return this.collection.updateOne({ _id: new ObjectId(userId) }, { $pull: { contacts: { $in: [new ObjectId(contactId)] } } });
  }

  async addAreaToUser({ userId, areaId }: AreaToUserType) {
    return this.collection.updateOne({ _id: new ObjectId(userId) }, { $push: { areas: areaId } });
  }

  removeAreaFromUser({ userId, areaId }: AreaToUserType) {
    return this.collection.updateOne({ _id: new ObjectId(userId) }, { $pull: { areas: { $in: [new ObjectId(areaId)] } } });
  }

  async addWeeklyTasksToUser({ userId, tasksId }: TasksToUserType) {
    return this.collection.updateOne({ _id: new ObjectId(userId) }, { $push: { tasks: tasksId } });
  }

  removeWeeklyTasksFromUser({ userId, tasksId }: TasksToUserType) {
    return this.collection.updateOne({ _id: new ObjectId(userId) }, { $pull: { tasks: { $in: [new ObjectId(tasksId)] } } });
  }
}

export default User;
export type { RegisterUserType };
