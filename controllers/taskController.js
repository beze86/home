const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await new Task().getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.log(`Tasks not found: ${error}`);
    res.status(500);
  }
};

exports.createWeeklyTask = async (req, res) => {
  try {
    const { insertedId } = await new Task().createWeeklyTask();
    res.status(201).json({ insertedId });
  } catch (error) {
    console.log(`Weekly task not created: ${error}`);
    res.status(500);
  }
};

exports.deleteWeeklyTask = async (req, res) => {
  try {
    const { id } = req.params;
    new Task().deleteWeeklyTask(id);
    res.status(200).json({ msg: `Weekly task deleted id: ${id}` });
  } catch (error) {
    console.log(`Weekly task not deleted: ${error}`);
    res.status(500);
  }
};
