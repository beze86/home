type TaskId = string;

type User = {
  name: string;
  area: string;
};

type Task = TaskCreation & {
  _id: TaskId;
};

type TaskCreation = {
  start: Date;
  end: Date;
  users: User[];
};

type TaskRepository = {
  getAllTasksByUser: () => Promise<Task[]>;
  createWeeklyTask: () => Promise<void>;
  deleteWeeklyTask: (id: TaskId) => Promise<void>;
};

export type { TaskId, Task, TaskRepository };
