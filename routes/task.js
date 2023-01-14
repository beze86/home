const { getAllTasksByUser, createWeeklyTask, deleteWeeklyTask } = require('../controllers/taskController');
const express = require('express');

const router = express.Router();

router.route('/').get(getAllTasksByUser).post(createWeeklyTask);

router.route('/:id').delete(deleteWeeklyTask);

module.exports = router;
