const router = require('express').Router();
const videoController = require('../controllers/coursecontroller/video');

router.get('/:id', videoController.getVideo);
router.post('/', videoController.createVideo);
router.put('/:id', videoController.editVideo);
router.delete('/:id', videoController.deleteVideo);
router.get('/courses/:courseid', videoController.getVideoByCourseId);
router.get('/getFirstVideo/:courseid', videoController.getFirstVideo);

module.exports = router;