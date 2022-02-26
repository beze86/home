const Task = require('../models/Task');

exports.getAllTasks = (req, res) => {
  new Task()
    .getAllTasks()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      throw err;
    });
};

exports.createWeeklyTask = (req, res) => {
  new Task()
    .createWeeklyTask()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      throw err;
    });
};
