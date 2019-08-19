const question = require('../../models/exammodel/QuestionsModel')
//create exam question
function createExamQuestion(req, res) {
    var examid = req.body.examid;
    if (!examid) {
        res.header("Access-Control-Allow-Origin", "*")
            .status(400)
            .json({
                msg: 'Create Exam Question Failed'
            });
    } else {
        var questions = req.body.questions;
        lastQuestion = question.findOne({ examID: examid },{index:1},  (err, lastindex) => {
            let index = "";

            if (lastindex && lastindex._id) {
                index = parseInt(lastindex.index) + 1
            } else {
                index = 1
            }
            questions.index = index
            question.create(questions, (err, result) => {
                if (err) {
                    res.header("Access-Control-Allow-Origin", "*")
                        .status(400)
                        .json({
                            msg: 'Create Exam Question Success'
                        });
                } else {
                    res.header("Access-Control-Allow-Origin", "*")
                        .status(200)
                        .json({
                            msg: 'Create Exam Question Success'
                        });
                }
            });
        }).sort({index:-1});

    }
}

//get exam questions
function getExamQuestion(req, res) {

    var examid = req.params.examid;

    if (!examid) {
        res.header("Access-Control-Allow-Origin", "*")
            .status(200)
            .json({
                msg: 'Exam ID must be specified'
            });
    } else {
        question.find({ examID: examid }, (err, docs) => {
            if (err) {
                res.header("Access-Control-Allow-Origin", "*")
                    .status(400)
                    .json({
                        msg: 'Search Exam Question Failed'
                    });
            } else {
                res.header("Access-Control-Allow-Origin", "*")
                    .status(200)
                    .json({
                        question: docs,
                        msg: 'Search Exam Question Success'
                    });
            }
        });
    }
}
//get exam questions
function getExamQuestionByIndex(req, res) {

    var examid = req.params.examid;
    var index = req.params.index;
    if (!examid) {
        res.header("Access-Control-Allow-Origin", "*")
            .status(200)
            .json({
                msg: 'Exam ID must be specified'
            });
    } else {
        question.findOne({ examID: examid, index: index }, (err, docs) => {
            if (err) {
                res.header("Access-Control-Allow-Origin", "*")
                    .status(400)
                    .json({
                        msg: 'Search Exam Question Failed'
                    });
            } else {
                res.header("Access-Control-Allow-Origin", "*")
                    .status(200)
                    .json({
                        question: docs,
                        msg: 'Search Exam Question Success'
                    });
            }
        });
    }
}

//edit exam question
function editExamQuestion(req, res) {
    var id = req.params.id;
    if (!id) {
        res.header("Access-Control-Allow-Origin", "*")
            .status(400)
            .json({
                msg: 'Question ID must be specified'
            });
    } else {
        var newQuestion = req.body.question;
        question.findOneAndUpdate({ _id: id }, newQuestion, (err, result) => {
            if (err) {
                res.header("Access-Control-Allow-Origin", "*")
                    .status(400)
                    .json({
                        msg: 'Edit Exam Question Failed'
                    });
            } else {
                res.header("Access-Control-Allow-Origin", "*")
                    .status(200)
                    .json({
                        msg: 'Edit Exam Question Success'
                    });
            }
        });
    }
}

//delete exam question
function deleteExamQuestion(req, res) {
    var id = req.params.id;
    if (!id) {
        res.header("Access-Control-Allow-Origin", "*")
            .status(400)
            .json({
                msg: 'Question ID must be specified'
            });
    } else {
        question.findOneAndDelete({ _id: id }, (err, result) => {
            if (err) {
                res.header("Access-Control-Allow-Origin", "*")
                    .status(400)
                    .json({
                        msg: 'Delete Exam Question Failed'
                    });
            } else {
                res.header("Access-Control-Allow-Origin", "*")
                    .status(200)
                    .json({
                        msg: 'Delete Exam Question Success'
                    });
            }
        });
    }
}

module.exports.createExamQuestion = createExamQuestion;
module.exports.getExamQuestion = getExamQuestion;
module.exports.getExamQuestionByIndex = getExamQuestionByIndex;
module.exports.editExamQuestion = editExamQuestion;
module.exports.deleteExamQuestion = deleteExamQuestion;