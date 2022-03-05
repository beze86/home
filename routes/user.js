const express = require('express');

const { getAllUsers, createUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').delete(deleteUser);

module.exports = router;
