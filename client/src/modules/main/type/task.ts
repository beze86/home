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
  getAllTasks: () => AxiosPromise<Task[]>;
  createWeeklyTask: () => AxiosPromise<{ insertedId: string }>;
};
