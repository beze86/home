import { InsertOneResult, ObjectId } from 'mongodb';

import { UserId } from '../../../users/domain/user';
import { AreaResult } from '../area/area';
import { ContactResult } from '../contact/contact';

type TaskId = ObjectId;

type GetWeeklyTasks = {
  userId: UserId;
};

type GetWeeklyTasksAreasAndContacts = {
  userId: UserId;
  areas: AreaResult[];
  contacts: ContactResult[];
};

type DeleteWeeklyTask = {
  id: TaskId;
};

type CreateWeeklyTask = {
  userId: UserId;
  weeklyTask: { start: number; end: number; users: { name: string; area: string }[] };
};

type UserTask = {
  name: string;
  area: string;
};

type TaskResult = {
  _id: TaskId;
  userId: UserId;
  start: Date;
  end: Date;
  users: UserTask[];
};

interface TaskRepository {
  getWeeklyTasks: (data: GetWeeklyTasks) => Promise<TaskResult[]>;
  deleteWeeklyTask: (data: DeleteWeeklyTask) => Promise<void>;
  createWeeklyTask: (data: CreateWeeklyTask) => Promise<InsertOneResult>;
}

export type {
  TaskId,
  GetWeeklyTasksAreasAndContacts,
  GetWeeklyTasks,
  DeleteWeeklyTask,
  CreateWeeklyTask,
  TaskRepository,
  TaskResult,
};
