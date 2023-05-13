import { Document, InsertOneResult, ObjectId, WithId } from 'mongodb';

import { EventId } from '../../home-utilities/domain/calendar/calendar';
import { TaskId } from '../../home-utilities/domain/task/task';
import { AreaId } from 'modules/home-utilities/domain/area/area';
import { ContactId } from 'modules/home-utilities/domain/contact/contact';

type UserId = ObjectId;

type Email = string;

type GetByEmail = {
  email: Email;
};

type DeleteUser = {
  id: UserId;
};

type RegisterUser = {
  email: Email;
  fullName: string;
  password: string;
  contacts: ObjectId[];
  areas: ObjectId[];
  tasks: ObjectId[];
  events: ObjectId[];
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

interface UserRepository {
  getUserByEmail: (data: GetByEmail) => Promise<WithId<Document> | null>;
  deleteUser: (data: DeleteUser) => Promise<void>;
  registerUser: (data: RegisterUser) => Promise<InsertOneResult>;
  addContactToUser: (data: ContactToUser) => Promise<void>;
  removeContactFromUser: (data: ContactToUser) => Promise<void>;
  addAreaToUser: (data: AreaToUser) => Promise<void>;
  removeAreaFromUser: (data: AreaToUser) => Promise<void>;
  addWeeklyTasksToUser: (data: TasksToUser) => Promise<void>;
  removeWeeklyTasksFromUser: (data: TasksToUser) => Promise<void>;
  addEventToUser: (data: EventToUser) => Promise<void>;
  removeEventFromUser: (data: EventToUser) => Promise<void>;
}

export { UserId, RegisterUser, GetByEmail, DeleteUser, ContactToUser, AreaToUser, TasksToUser, EventToUser, UserRepository };
