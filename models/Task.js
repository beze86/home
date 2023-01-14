const Area = require('./Area');
const BaseModel = require('./BaseModel');
const Contact = require('./Contact');
const { shuffle } = require('../utils');
const weekday = require('dayjs/plugin/weekday');
const dayjs = require('dayjs');
const { ObjectId } = require('mongodb');
const User = require('./User');

class Task extends BaseModel {
  constructor() {
    super('tasks');
  }

  getAllTasksByUser({ userId }) {
    return this.findByUserId({ userId: new ObjectId(userId) });
  }

  async deleteWeeklyTask({ userId, id }) {
    await this.deleteOne(id);
    return new User().removeWeeklyTasksFromUser({ userId, tasksId: id });
  }

  async createWeeklyTask({ userId }) {
    const weeklyTasks = await this.setWeeklyTasks(userId);
    const { insertedId } = await this.insertOne({ userId: new ObjectId(userId), ...weeklyTasks });
    await new User().addWeeklyTasksToUser({ userId, insertedId });
    return insertedId;
  }

  async setWeeklyTasks(userId) {
    dayjs.extend(weekday);
    const nextMonday = dayjs().weekday(1 + 7);
    const nextSunday = dayjs().weekday(0 + 14);
    const areas = await new Area().getAllAreasByUser({ userId });
    const contacts = await new Contact().getAllContactsByUser({ userId });

    shuffle(areas);
    const usersWithAreas = contacts.map(({ fullName }, i) => {
      return {
        name: `${fullName}`,
        area: `${areas[i].area}`,
      };
    });
    return {
      start: Number(nextMonday),
      end: Number(nextSunday),
      users: [...usersWithAreas],
    };
  }
}

module.exports = Task;
