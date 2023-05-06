import { ObjectId, WithId } from 'mongodb';

import { UserId } from '../../../../models/User';

type TaskId = ObjectId;

type GetWeeklyTasks = {
  userId: UserId;
};

type DeleteWeeklyTask = {
  userId: UserId;
  id: TaskId;
};

type CreateWeeklyTask = {
  userId: UserId;
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
  getWeeklyTasks: (data: GetWeeklyTasks) => Promise<WithId<TaskResult>[]>;
  deleteWeeklyTask: (data: DeleteWeeklyTask) => Promise<void>;
  createWeeklyTask: (data: CreateWeeklyTask) => Promise<void>;
  setWeeklyTask: (data: UserId) => Promise<{ start: number; end: number; users: { name: string; area: string }[] }>;
}

export type { GetWeeklyTasks, DeleteWeeklyTask, CreateWeeklyTask, TaskRepository, TaskResult };
