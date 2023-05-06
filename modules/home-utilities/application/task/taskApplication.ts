import { UserId } from '../../../../models/User';
import { CreateWeeklyTask, DeleteWeeklyTask, GetWeeklyTasks, TaskRepository } from '../../domain/task/task';

class TaskApplication implements TaskRepository {
  private readonly repository: TaskRepository;

  constructor(repository: TaskRepository) {
    this.repository = repository;
  }

  getWeeklyTasks({ userId }: GetWeeklyTasks) {
    return this.repository.getWeeklyTasks({ userId });
  }

  createWeeklyTask({ userId }: CreateWeeklyTask) {
    return this.repository.createWeeklyTask({ userId });
  }

  deleteWeeklyTask({ userId, id }: DeleteWeeklyTask) {
    return this.repository.deleteWeeklyTask({ userId, id });
  }

  setWeeklyTask(id: UserId) {
    return this.repository.setWeeklyTask(id);
  }
}

export default TaskApplication;
