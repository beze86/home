const express = require('express');

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');

const router = express.Router();

router.route('/').get(getAllUsers);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
