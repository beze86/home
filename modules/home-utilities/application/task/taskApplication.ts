import { getWeekDays, shuffle } from '../../../../utils';
import { DeleteWeeklyTask, GetWeeklyTasks, GetWeeklyTasksAreasAndContacts, TaskRepository } from '../../domain/task/task';

class TaskApplication {
  private readonly repository: TaskRepository;

  constructor(repository: TaskRepository) {
    this.repository = repository;
  }

  getWeeklyTasks({ userId }: GetWeeklyTasks) {
    return this.repository.getWeeklyTasks({ userId });
  }

  async createWeeklyTask({ userId, areas, contacts }: GetWeeklyTasksAreasAndContacts) {
    const weeklyTask = this.setWeeklyTask({ userId, areas, contacts });
    return this.repository.createWeeklyTask({ userId, weeklyTask });
  }

  deleteWeeklyTask({ id }: DeleteWeeklyTask) {
    return this.repository.deleteWeeklyTask({ id });
  }

  setWeeklyTask({ areas, contacts }: GetWeeklyTasksAreasAndContacts) {
    const nextMonday = getWeekDays().nextMonday;
    const nextSunday = getWeekDays().nextSunday;

    shuffle(areas);

    if (contacts.length > areas.length) {
      contacts.splice(areas.length);
    }

    const usersWithAreas = contacts.map(({ name }, i) => {
      return {
        name,
        area: areas[i].area,
      };
    });

    return {
      start: Number(nextMonday),
      end: Number(nextSunday),
      users: usersWithAreas,
    };
  }
}

export default TaskApplication;
