const { registerUser, loginUser, deleteUser } = require('../controllers/userController');
const express = require('express');

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(loginUser);

router.route('/:id').delete(deleteUser);

module.exports = router;
