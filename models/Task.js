const { getDb } = require('../db');
// const { ObjectId } = require('mongodb');
const User = require('./User');
const Area = require('./Area');
const utils = require('../utils');
const moment = require('moment');

class Task {
  collection;

  constructor() {
    this.collection = getDb().collection('tasks');
  }

  getAllTasks() {
    return this.collection.find().toArray();
  }

  async createWeeklyTask() {
    const sunday = moment()
      .day(0 + 7)
      .format('x');

    const endOfTheTask = moment()
      .day(0 + 13)
      .format('x');

    const areas = await new Area().getAllAreas();
    const users = await new User().getAllUsers();

    utils.shuffle(areas);

    const usersWithAreas = users.map(({ user }, i) => {
      return {
        name: `${user}`,
        // color: color,
        area: `${areas[i].area}`,
      };
    });
    const weeklyTasks = {
      start: Number(sunday),
      end: Number(endOfTheTask),
      users: [...usersWithAreas],
    };
    return this.collection.insertOne(weeklyTasks);
  }

  // updateSingleData(id, eventData) {
  //       return this.collection.updateOne({_id: new ObjectId(id)}, {$set: {description: eventData.description}})
  //   }
}

module.exports = Task;
