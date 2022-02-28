const dayjs = require('dayjs');
const weekday = require('dayjs/plugin/weekday');

const { shuffle } = require('../utils');

const Area = require('./Area');
const BaseModel = require('./BaseModel');
const User = require('./User');

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
    const nextMonday = dayjs().weekday(1);
    const nextSunday = dayjs().weekday(7);

    const areas = await new Area().getAllAreas();
    const users = await new User().getAllUsers();

    shuffle(areas);

    const usersWithAreas = users.map(({ user }, i) => {
      return {
        name: `${user}`,
        area: `${areas[i].area}`,
      };
    });
    const weeklyTasks = {
      start: Number(nextMonday),
      end: Number(nextSunday),
      users: [...usersWithAreas],
    };

    return weeklyTasks;
  }
}

module.exports = Task;
