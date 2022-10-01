const { getAllAccounts, createAccount, deleteAccount } = require('../controllers/accountController');
const express = require('express');

const router = express.Router();

router.route('/').get(getAllAccounts).post(createAccount);

router.route('/:id').delete(deleteAccount);

module.exports = router;
