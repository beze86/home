const express = require('express');

const {
  getAllContacts,
  createContact,
  deleteContact,
} = require('../controllers/contactController');

const router = express.Router();

router.route('/').get(getAllContacts).post(createContact);

router.route('/:id').delete(deleteContact);

module.exports = router;
