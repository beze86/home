const express = require('express');
const router = express.Router();

// get controllers
const curriculumController = require('./controllers/curriculumController');

router.get('/', curriculumController.getCurricula);
router.get('/:id', curriculumController.getCurriculum);
router.post('/', curriculumController.postCurriculum);
router.patch('/', curriculumController.updateCurriculm);
router.delete('/:id', curriculumController.deleteCurriculum);

module.exports = router;
