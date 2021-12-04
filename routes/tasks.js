const express = require('express');

const {
  getAllTasks,
  createWeeklyTasks,
  getWeeklyTasks,
  updateWeeklyTasks,
  deleteWeeklyTasks,
} = require('../controllers/tasksController');

const router = express.Router();

router.route('/').get(getAllTasks).post(createWeeklyTasks);

router
  .route('/:id')
  .get(getWeeklyTasks)
  .patch(updateWeeklyTasks)
  .delete(deleteWeeklyTasks);

module.exports = router;
