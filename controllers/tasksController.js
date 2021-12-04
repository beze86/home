const Tasks = require('../models/Tasks');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.getAllTasks();
    res.status(200).json(tasks);
  } catch (err) {
    console.log(`get tasks error: ${err}`);
    res.status(500);
  }
};

exports.createWeeklyTasks = (req, res) => {
  res.send('create tasks');
};

exports.getWeeklyTasks = (req, res) => {
  res.send('get task');
};

exports.updateWeeklyTasks = (req, res) => {
  res.send('update task');
};

exports.deleteWeeklyTasks = (req, res) => {
  res.send('delete task');
};
