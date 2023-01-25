import { AxiosPromise } from 'axios';

export type Task = {
  _id: string;
  start: Date;
  end: Date;
  users: {
    name: string;
    area: string;
  }[];
};

export type TaskRepository = {
  getAllTasksByUser: () => AxiosPromise<Task[]>;
  createWeeklyTask: () => AxiosPromise<{ insertedId: string }>;
  deleteWeeklyTask: (id: Task['_id']) => AxiosPromise<void>;
};
