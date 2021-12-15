const express = require('express');

const {
  getAllAreas,
  createArea,
  getArea,
  updateArea,
  deleteArea,
} = require('../controllers/areasController');

const router = express.Router();

router.route('/').get(getAllAreas).post(createArea);

router.route('/:id').get(getArea).put(updateArea).delete(deleteArea);

module.exports = router;
