import { getWeekDays, shuffle } from '../../../../utils';
import { AreaRepository } from '../../domain/area/area';
import { ContactRepository } from '../../domain/contact/contact';
import { DeleteWeeklyTask, GetWeeklyTasks, TaskRepository } from '../../domain/task/task';

class TaskApplication implements TaskRepository {
  private readonly taskRepository: TaskRepository;
  private readonly areaRepository: AreaRepository;
  private readonly contactRepository: ContactRepository;

  constructor(taskRepository: TaskRepository, areaRepository: AreaRepository, contactRepository: ContactRepository) {
    this.taskRepository = taskRepository;
    this.areaRepository = areaRepository;
    this.contactRepository = contactRepository;
  }

  getWeeklyTasks({ userId }: GetWeeklyTasks) {
    return this.taskRepository.getWeeklyTasks({ userId });
  }

  async createWeeklyTask({ userId }: GetWeeklyTasks) {
    const weeklyTask = await this.setWeeklyTask({ userId });
    return this.taskRepository.createWeeklyTask({ userId, weeklyTask });
  }

  deleteWeeklyTask({ userId, id }: DeleteWeeklyTask) {
    return this.taskRepository.deleteWeeklyTask({ userId, id });
  }

  async setWeeklyTask({ userId }: GetWeeklyTasks) {
    const nextMonday = getWeekDays().nextMonday;
    const nextSunday = getWeekDays().nextSunday;

    const areas = await this.areaRepository.getAreas({ userId });
    const contacts = await this.contactRepository.getContacts({ userId });

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
