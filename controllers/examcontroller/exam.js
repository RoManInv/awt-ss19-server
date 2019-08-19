const exam = require('../../models/exammodel/ExamsModel');
//create exam sheet
function createExam(req, res) {
    var newExam = req.body.exam;    
    if(req.query.id) {
        newExam._id = newExam.courseId.toString() + id.toString();
    }
    var newExamSchema = new exam(newExam);
    newExamSchema.save((err, result) => {
        if(err) {
            res.header("Access-Control-Allow-Origin", "*")
               .status(400)
               .json({
                    msg: 'Create Exam Failed'
            });
        } else {
            res.header("Access-Control-Allow-Origin", "*")
               .status(200)
               .json({
                   exam : result,
                    msg: 'Create Exam Success'
            });
        }
    });
}

//get exam
function getExam(req, res) {
    
    if(!req.params.id) {
        res.header("Access-Control-Allow-Origin", "*")
           .status(400)
           .json({
                msg: 'ID must be specified'
        });
    } else {
        id = req.params.id;
        exam.findById(id, (err, result) => {
            if(err) {
                res.header("Access-Control-Allow-Origin", "*")
                   .status(400)
                   .json({
                        msg: 'Exam Not Found'
                });
            } else {
                res.header("Access-Control-Allow-Origin", "*")
                   .status(200)
                   .json({
                       exam: result,
                       msg: 'Search Success'
                 });
            }
        });
    }
}

function getExamByCourseId(req, res) {
    if(!req.params.courseid) {
        res.header("Access-Control-Allow-Origin", "*")
           .status(400)
           .json({
                msg: 'ID must be specified'
        });
    } else {
        id = req.params.courseid;
        exam.findOne({courseId: id}, (err, result) => {
            if(err) {
                res.header("Access-Control-Allow-Origin", "*")
                   .status(400)
                   .json({
                        msg: 'Exam Not Found'
                });
            } else {
                
                res.header("Access-Control-Allow-Origin", "*")
                   .status(200)
                   .json({
                       exam: result,
                       msg: 'Search Success'
                 });
            }
        });
    }
}

//delete exam
function deleteExam(req, res) {
    if(!req.params.id) {
        res.header("Access-Control-Allow-Origin", "*")
           .status(400)
          .json({
                msg: 'ID must be specified'
        });
    } else {
        exam.findOneAndDelete({_id: req.params.id}, (err, result) => {
            if(err) {
                res.header("Access-Control-Allow-Origin", "*")
                   .status(400)
                   .json({
                        msg: 'Delete Exam Failed'
                });
            } else {
                res.header("Access-Control-Allow-Origin", "*")
                   .status(200)
                   .json({
                        msg: 'Delete Exam Success'
                });
            }
        });
    }
}

//edit exam
function editExam(req, res) {
    if(!req.params.id) {
        res.header("Access-Control-Allow-Origin", "*")
           .status(400)
           .json({
                msg: 'ID must be specified'
        });
    } else {
        exam.findOneAndUpdate({_id: req.params.id}, (err, result) => {
            if(err) {
                res.header("Access-Control-Allow-Origin", "*")
                   .status(400)
                   .json({
                        msg: 'Update Exam Failed'
                });
            } else {
                res.header("Access-Control-Allow-Origin", "*")
                   .status(400)
                   .json({
                        msg: 'Update Exam Success'
                });
            }
        });
    }
}


module.exports.deleteExam = deleteExam;
module.exports.editExam = editExam;
module.exports.getExam = getExam;
module.exports.getExamByCourseId = getExamByCourseId;
module.exports.createExam = createExam;