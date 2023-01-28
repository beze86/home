import { Collection, ObjectId, WithId } from 'mongodb';

import Area from './Area';
import Contact from './Contact';
import User, { UserId } from './User';
import database from '../Database';
import { shuffle, getWeekDays } from '../utils';

type TaskId = ObjectId;

type GetAllTasksByUser = {
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

interface TaskInterface {
  collection: Collection;
  getAllTasksByUser: (data: GetAllTasksByUser) => Promise<WithId<TaskResult>[]>;
  deleteWeeklyTask: (data: DeleteWeeklyTask) => Promise<void>;
  createWeeklyTask: (data: CreateWeeklyTask) => Promise<void>;
  setWeeklyTask: (data: UserId) => Promise<{ start: number; end: number; users: { name: string; area: string }[] }>;
}

class Task implements TaskInterface {
  collection;

  constructor() {
    this.collection = database.getDb().collection('tasks');
  }

  async getAllTasksByUser({ userId }: GetAllTasksByUser) {
    return await this.collection.find<TaskResult>({ userId: new ObjectId(userId) }).toArray();
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

export default Task;
export type { TaskId };
