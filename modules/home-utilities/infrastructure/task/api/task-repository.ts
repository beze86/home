import { ObjectId } from 'mongodb';

import database from '../../../../../Database';
import Area from '../../../../../models/Area';
import Contact from '../../../../../models/Contact';
import User, { UserId } from '../../../../../models/User';
import { getWeekDays, shuffle } from '../../../../../utils';
import { CreateWeeklyTask, DeleteWeeklyTask, GetWeeklyTasks, TaskRepository, TaskResult } from '../../../domain/task/task';

class MongoTaskRepository implements TaskRepository {
  private readonly collection;

  constructor() {
    this.collection = database.get().collection('tasks');
  }

  getWeeklyTasks({ userId }: GetWeeklyTasks) {
    return this.collection.find<TaskResult>({ userId: new ObjectId(userId) }).toArray();
  }

  async deleteWeeklyTask({ userId, id }: DeleteWeeklyTask) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
    await new User().removeWeeklyTasksFromUser({ userId, tasksId: id });
  }

  async createWeeklyTask({ userId }: CreateWeeklyTask) {
    const weeklyTasks = await this.setWeeklyTask(userId);
    const { insertedId } = await this.collection.insertOne({ userId: new ObjectId(userId), ...weeklyTasks });
    await new User().addWeeklyTasksToUser({ userId, tasksId: insertedId });
  }

  async setWeeklyTask(userId: UserId) {
    const nextMonday = getWeekDays().nextMonday;
    const nextSunday = getWeekDays().nextSunday;
    const areas = await new Area().getAllAreasByUser({ userId });
    const contacts = await new Contact().getAllContactsByUser({ userId });

    const usersWithAreas = () => {
      shuffle(areas);
      return contacts.map(({ name }, i) => {
        return {
          name: `${name}`,
          area: `${areas[i].area}`,
        };
      });
    };

    return {
      start: Number(nextMonday),
      end: Number(nextSunday),
      users: [...usersWithAreas()],
    };
  }
}

export default MongoTaskRepository;
