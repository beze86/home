const Area = require('./Area');
const BaseModel = require('./BaseModel');
const Contact = require('./Contact');
const { shuffle } = require('../utils');
const weekday = require('dayjs/plugin/weekday');
const dayjs = require('dayjs');

class Task extends BaseModel {
  constructor() {
    super('tasks');
  }

  getAllTasks() {
    return this.find();
  }

  async createWeeklyTask() {
    const weeklyTasks = await this.setWeeklyTasks();

    return this.insertOne(weeklyTasks);
  }

  deleteWeeklyTask(id) {
    return this.deleteOne(id);
  }

  async setWeeklyTasks() {
    dayjs.extend(weekday);
    const nextMonday = dayjs().weekday(1 + 7);
    const nextSunday = dayjs().weekday(0 + 14);
    const areas = await new Area().getAllAreas();
    const contacts = await new Contact().getAllContacts();

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
