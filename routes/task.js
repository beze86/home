const express = require('express');

const { getAllTasks, createWeeklyTask } = require('../controllers/taskController');

const router = express.Router();

router.route('/').get(getAllTasks).post(createWeeklyTask);

// router.route('/:id').get(getWeeklyTasks).put(updateWeeklyTasks).delete(deleteWeeklyTasks);

module.exports = router;
