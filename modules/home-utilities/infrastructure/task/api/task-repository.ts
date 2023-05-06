import { ObjectId } from 'mongodb';

import database from '../../../../../Database';
import User from '../../../../../models/User';
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

  async createWeeklyTask({ userId, weeklyTask }: CreateWeeklyTask) {
    const { insertedId } = await this.collection.insertOne({ userId: new ObjectId(userId), ...weeklyTask });
    await new User().addWeeklyTasksToUser({ userId, tasksId: insertedId });
  }
}

export default MongoTaskRepository;
