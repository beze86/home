import { Collection, ObjectId, UpdateResult, WithId } from 'mongodb';

import Area from './Area';
import Contact from './Contact';
import User from './User';
import database from '../Database';
import { shuffle, getWeekDays } from '../utils';

type UserId = ObjectId;

type GetAllTasksByUserType = {
  userId: UserId;
};

type DeleteWeeklyTaskType = {
  userId: UserId;
  id: ObjectId;
};

type CreateWeeklyTaskType = {
  userId: UserId;
};

interface TaskInterface {
  collection: Collection;
  getAllTasksByUser: (data: GetAllTasksByUserType) => Promise<WithId<Document>[]>;
  deleteWeeklyTask: (data: DeleteWeeklyTaskType) => Promise<UpdateResult>;
  createWeeklyTask: (data: CreateWeeklyTaskType) => Promise<ObjectId>;
  setWeeklyTask: (data: UserId) => Promise<{ start: number; end: number; users: { name: string; area: string }[] }>;
}

class Task implements TaskInterface {
  collection;

  constructor() {
    this.collection = database.getDb().collection('tasks');
  }

  getAllTasksByUser({ userId }: GetAllTasksByUserType) {
    return this.collection.find({ userId: new ObjectId(userId) }).toArray();
  }

  async deleteWeeklyTask({ userId, id }: DeleteWeeklyTaskType) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
    return new User().removeWeeklyTasksFromUser({ userId, tasksId: id });
  }

  async createWeeklyTask({ userId }: CreateWeeklyTaskType) {
    const weeklyTasks = await this.setWeeklyTask(userId);
    const { insertedId } = await this.collection.insertOne({ userId: new ObjectId(userId), ...weeklyTasks });
    await new User().addWeeklyTasksToUser({ userId, tasksId: insertedId });
    return insertedId;
  }

  async setWeeklyTask(userId: UserId) {
    const nextMonday = getWeekDays().nextMonday;
    const nextSunday = getWeekDays().nextSunday;
    const areas = await new Area().getAllAreasByUser({ userId });
    const contacts = await new Contact().getAllContactsByUser({ userId });

    const usersWithAreas = () => {
      shuffle(areas);
      return contacts.map(({ fullName }, i) => {
        return {
          name: `${fullName}`,
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
