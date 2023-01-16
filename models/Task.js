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
    return this.find({ userId: new ObjectId(userId) });
  }

  async deleteWeeklyTask({ userId, id }) {
    await this.deleteOne(id);
    return new User().removeWeeklyTasksFromUser({ userId, tasksId: id });
  }

  async createWeeklyTask({ userId }) {
    const weeklyTasks = await this.setWeeklyTasks(userId);
    const { insertedId } = await this.insertOne({ userId: new ObjectId(userId), ...weeklyTasks });
    await new User().addWeeklyTasksToUser({ userId, tasksId: insertedId });
    return insertedId;
  }

  getNextMonday() {
    return dayjs().weekday(1 + 7);
  }
  getNextSunday() {
    return dayjs().weekday(0 + 14);
  }

  mapAreasToContacts(areas, contacts) {
    shuffle(areas);
    return contacts.map(({ fullName }, i) => {
      return {
        name: `${fullName}`,
        area: `${areas[i].area}`,
      };
    });
  }

  async setWeeklyTasks(userId) {
    dayjs.extend(weekday);
    const nextMonday = this.getNextMonday();
    const nextSunday = this.getNextSunday();
    const areas = await new Area().getAllAreasByUser({ userId });
    const contacts = await new Contact().getAllContactsByUser({ userId });

    const usersWithAreas = this.mapAreasToContacts(areas, contacts);
    return {
      start: Number(nextMonday),
      end: Number(nextSunday),
      users: [...usersWithAreas],
    };
  }
}

module.exports = Task;
