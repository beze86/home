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
  getAllTasksByUser: () => Promise<Task[]>;
  createWeeklyTask: () => Promise<void>;
  deleteWeeklyTask: (id: Task['_id']) => Promise<void>;
};
