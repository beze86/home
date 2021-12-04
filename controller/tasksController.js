const getTasks = (req, res) => {
  res.send('get tasks');
};

const createTask = (req, res) => {
  res.send('create tasks');
};

const getTask = (req, res) => {
  res.send('get task');
};

const updateTask = (req, res) => {
  res.send('update task');
};

const deleteTask = (req, res) => {
  res.send('delete task');
};

module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
