const examController = require('../controllers/examcontroller/exam');
const questionController = require('../controllers/examcontroller/examquestion');
const gradeController = require('../controllers/examcontroller/grade');
const express = require('express');
const router = express.Router();

router.get('/:id', examController.getExam);
router.post('/', examController.createExam);
router.delete('/:id', examController.deleteExam);
router.put('/:id', examController.editExam);
router.get('/courses/:courseid', examController.getExamByCourseId);

// router.get('/grade/:id', gradeController.getExamGrade);
// router.post('/grade', gradeController.bookExamGrade);
// router.delete('/grade/:id', gradeController.deleteExamGrade);
// router.put('/:id', gradeController.editExamQuestion);

router.get('/question/:examid', questionController.getExamQuestion);
router.get('/question/:examid/:index', questionController.getExamQuestionByIndex);
router.post('/question', questionController.createExamQuestion);
router.delete('/question/:id', questionController.deleteExamQuestion);
router.put('/question/:id', questionController.editExamQuestion);

module.exports = router;