const { getAllTasks, createWeeklyTask, deleteWeeklyTask } = require('../controllers/taskController');
const express = require('express');

const router = express.Router();

router.route('/').get(getAllTasks).post(createWeeklyTask);

router.route('/:id').delete(deleteWeeklyTask);

module.exports = router;
