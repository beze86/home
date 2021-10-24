const express = require('express');

const { getTasks, createTask, getTask, updateTask, deleteTask } = require('../controller/usersController.js');

const router = express.Router();

router.route('/').get(getTasks).post(createTask);

router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
