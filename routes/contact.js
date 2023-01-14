const { getAllContactsByUser, createContact, deleteContact } = require('../controllers/contactController');
const express = require('express');

const router = express.Router();

router.route('/').get(getAllContactsByUser).post(createContact);

router.route('/:id').delete(deleteContact);

module.exports = router;
