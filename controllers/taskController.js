const Task = require('../models/Task');

exports.getAllTasksByUser = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const tasks = await new Task().getAllTasksByUser({ userId: req.userId });
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(`Error retrieving tasks: ${error}`);
    return res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

exports.createWeeklyTask = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const insertedId = await new Task().createWeeklyTask({ userId: req.userId });
    return res.status(201).json({ insertedId });
  } catch (error) {
    console.log(`Error creating weekly task: ${error}`);
    return res.status(500).json({ error: 'Failed to create weekly task' });
  }
};

exports.deleteWeeklyTask = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    await new Task().deleteWeeklyTask({ userId: req.userId, id: req.params.id });
    return res.status(200).json({ msg: `Weekly task deleted id: ${req.params.id}` });
  } catch (error) {
    console.log(`Error deleting weekly task: ${error}`);
    return res.status(500).json({ error: 'Failed to delete weekly task' });
  }
};
