import { TaskRepository } from 'client/modules/home-utilities/domain/task/task';

const TaskService = (repository: TaskRepository): TaskRepository => {
  return {
    getTasks: () => repository.getTasks(),
    createWeeklyTask: () => repository.createWeeklyTask(),
    deleteWeeklyTask: (id) => repository.deleteWeeklyTask(id),
  };
};

export { TaskService };
