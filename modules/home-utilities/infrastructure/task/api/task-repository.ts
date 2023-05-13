import { ObjectId } from 'mongodb';

import database from '../../../../../Database';
import { CreateWeeklyTask, DeleteWeeklyTask, GetWeeklyTasks, TaskRepository, TaskResult } from '../../../domain/task/task';

class MongoTaskRepository implements TaskRepository {
  private readonly collection;

  constructor() {
    this.collection = database.get().collection('tasks');
  }

  getWeeklyTasks({ userId }: GetWeeklyTasks) {
    return this.collection.find<TaskResult>({ userId: new ObjectId(userId) }).toArray();
  }

  async deleteWeeklyTask({ id }: DeleteWeeklyTask) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  async createWeeklyTask({ userId, weeklyTask }: CreateWeeklyTask) {
    return await this.collection.insertOne({ userId, ...weeklyTask });
  }
}

export default MongoTaskRepository;
