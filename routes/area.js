const { getAllAreasByUser, createArea, getArea, updateArea, deleteArea } = require('../controllers/areaController');
const express = require('express');

const router = express.Router();

router.route('/').get(getAllAreasByUser).post(createArea);

router.route('/:id').get(getArea).put(updateArea).delete(deleteArea);

module.exports = router;
