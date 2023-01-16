const Task = require('../models/Task');

exports.getAllTasksByUser = async (req, res) => {
  const userId = req.userId;
  try {
    const tasks = await new Task().getAllTasksByUser({ userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.log(`Tasks not found: ${error}`);
    res.status(500);
  }
};

exports.createWeeklyTask = async (req, res) => {
  const userId = req.userId;
  try {
    const insertedId = await new Task().createWeeklyTask({ userId });
    res.status(201).json({ insertedId });
  } catch (error) {
    console.log(`Weekly task not created: ${error}`);
    res.status(500);
  }
};

exports.deleteWeeklyTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const payload = {
    userId,
    id,
  };
  try {
    await new Task().deleteWeeklyTask(payload);
    res.status(200).json({ msg: `Weekly task deleted id: ${payload.id}` });
  } catch (error) {
    console.log(`Weekly task not deleted: ${error}`);
    res.status(500);
  }
};
