const router = require('express').Router();
const courseController = require('../controllers/coursecontroller/lecture');

router.get('/:id', courseController.getCourseByID);
router.get('/cat/:cat', courseController.getCourseByCat);
router.get('/deg/:deg', courseController.getCourseByDeg);
router.get('/author/:authorid', courseController.getCourseByAuthor);
router.get('/getCourseAttended/:userid', courseController.getCourseAttended);
router.get('/random/courses', courseController.getRandomCourses);
router.post('/dcs', courseController.getCourseByDCS);
router.post('/', courseController.createCourse);
router.put('/:id', courseController.editCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;