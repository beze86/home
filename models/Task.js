const { getDb } = require('../db');
const { ObjectId } = require('mongodb');
const User = require('./User');
const Area = require('./Area');
const { shuffle } = require('../utils');
const dayjs = require('dayjs');
const weekday = require('dayjs/plugin/weekday');

class Task {
  collection;

  constructor() {
    this.collection = getDb().collection('tasks');
  }

  getAllTasks() {
    return this.collection.find().toArray();
  }

  async createWeeklyTask() {
    const weeklyTasks = await this.setWeeklyTasks();

    return this.collection.insertOne(weeklyTasks);
  }

  deleteWeeklyTask(id) {
    return this.collection.deleteOne({ _id: new ObjectId(id) });
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
