const course = require('../../models/lecturemodel/CourseModel');
const user = require('../../models/usermodel/UserModel');
const random = require('../../util/randomUtil');
//get course info
function getCourseByID(req, res) {
    course.findById(req.params.id, (err, result) => {
        if (err) {
            res.header("Access-Control-Allow-Origin", "*")
                .status(400)
                .json({
                    msg: 'No Such Course'
                });
        } else {
            res.header('Access-Control-Allow-Origin', '*')
                .status(200)
                .json({
                    course: result,
                    msg: 'Search Success'
                });
        }
    });
}

function getCourseByCat(req, res) {
    course.find({ cat: req.params.cat }, (err, result) => {
        if (err) {
            res.header("Access-Control-Allow-Origin", "*")
                .status(400)
                .json({
                    msg: 'No Such Course'
                });
        } else {
            res.header("Access-Control-Allow-Origin", "*")
                .status(200)
                .json({
                    course: result,
                    msg: 'Search Success'
                });
        }
    });
}

function getCourseByDeg(req, res) {
    course.find({ deg: req.params.deg }, (err, result) => {
        // console.log("1");
        if (err) {
            // console.log("2");
            res.header("Access-Control-Allow-Origin", "*")
                .status(400)
                .json({
                    msg: 'No Such Course'
                });
        } else {
            res.header("Access-Control-Allow-Origin", "*")
                .status(200)
                .json({
                    course: result,
                    msg: 'Search Success'
                });
        }
    });
}

function getCourseByAuthor(req, res) {
    course.find({ author: req.params.authorid }, (err, docs) => {
        if (err) {
            res.header("Access-Control-Allow-Origin", "*")
                .status(400)
                .json({
                    msg: 'No Such Course'
                });
        } else {
            res.header("Access-Control-Allow-Origin", "*")
                .status(200)
                .json({
                    course: docs,
                    msg: 'Search Success'
                });
        }
    });
}

function getRandomCourses(req, res) {
    course.find({}, (err, docs) => {
        if (err) {
            res.header("Access-Control-Allow-Origin", "*")
                .status(400)
                .json({
                    msg: 'No Such Course'
                });
        } else {
            var result = [];
            var i;
            var docLength = docs.length;
            for (i = 0; i < 3; i++) {
                var index = random.getRandomNum(0, docLength);
                result.push(docs[index]);
            }
            //console.log(docs);
            res.header("Access-Control-Allow-Origin", "*")
                .status(200)
                .json({
                    course: docs,
                    msg: 'Search Success'
                });

            /*res.send({
                course: docs,
                    msg: 'Search Successgggggg'
                });*/
        }
    });
}

function getCourseByDCS(req, res) {
    // console.log(req.body);
    var condition = {};
    if (req.body.deg !== '0') {
        condition.degree = req.body.deg;
    }
    if (req.body.cat !== '0') {
        condition.category = req.body.cat;
    }
    if (req.body.sub !== '0') {
        condition.subject = req.body.sub;
    }
    // console.log(condition);
    course.find(condition, (err, docs) => {
        if (err) {

            res.header("Access-Control-Allow-Origin", "*")
                .status(400)
                .json({
                    msg: 'No Such Course'
                });
        } else {
            res.header("Access-Control-Allow-Origin", "*")
                .status(200)
                .json({
                    course: docs,
                    msg: 'Search Success'
                });
        }
    });
}

//edit course
function editCourse(req, res) {
    if (!req.params.id) {
        res.header("Access-Control-Allow-Origin", "*")
            .status(400)
            .json({
                msg: 'ID must be specified'
            });
    } else {
        id = req.params.id;
        course.findOneAndUpdate({ _id: id }, req.body.course, (err, result) => {
            if (err) {
                res.header("Access-Control-Allow-Origin", "*")
                    .status(400)
                    .json({
                        msg: 'Update Failed'
                    });
            } else {
                res.header("Access-Control-Allow-Origin", "*")
                    .status(200)
                    .json({
                        data: result,
                        msg: 'Update Success'
                    });
            }
        });
    }
}

//delete course
function deleteCourse(req, res) {
    if (!req.params.id) {
        res.header("Access-Control-Allow-Origin", "*")
            .status(400)
            .json({
                msg: 'ID must be specified'
            });
    } else {
        let id = req.params.id;
        course.findOneAndDelete({ _id: id }, (err, result) => {
            if (err) {
                res.header("Access-Control-Allow-Origin", "*")
                    .status(400)
                    .json({
                        msg: 'Delete Failed'
                    });
            } else {
                res.header("Access-Control-Allow-Origin", "*")
                    .status(200)
                    .json({
                        msg: 'Delete Success'
                    });
            }
        })
    }
}

//create course
function createCourse(req, res) {
    newCourse = req.body.course;
    if (req.query.id) {
        courseID = req.query.id;
        newCourse._id = newCourse.subject.toString() + id.toString();
    }
    newCourseSchema = new course(newCourse);
    newCourseSchema.save((err, result) => {
        if (err) {
            res.header("Access-Control-Allow-Origin", "*")
                .status(400)
                .json({
                    err: err,
                    msg: 'Create Course Failed'
                });
        } else {
            res.header("Access-Control-Allow-Origin", "*")
                .status(200)
                .json({
                    course: result,
                    msg: 'Create Course Success'
                });
        }
    });
}
function getCourseAttended(req, res) {
    id = req.params.userid
    if (!id) {
        res.header("Access-Control-Allow-Origin", "*")
            .status(400)
            .json({
                msg: 'User ID must be specified'
            });
    } else {
        user.findOne({ userAuthenticationId: id }, (err, result) => {

            if (err) {
                res.header("Access-Control-Allow-Origin", "*")
                    .status(400)
                    .json({
                        msg: 'Search User Failed'
                    });
            } else {
                course.find({ _id: { $in: result.courses } }, (err, result2) => {
                    if (err) {
                        res.header("Access-Control-Allow-Origin", "*")
                            .status(400)
                            .json({
                                msg: 'Search User Failed'
                            });
                    } else {
                        res.header("Access-Control-Allow-Origin", "*")
                            .status(200)
                            .json({
                                course: result2,
                                msg: 'Create Course Success'
                            });
                    }
                })
            }
        });
    }
}

module.exports.getCourseByID = getCourseByID;
module.exports.getCourseByCat = getCourseByCat;
module.exports.getCourseByDeg = getCourseByDeg;
module.exports.getCourseByAuthor = getCourseByAuthor;
module.exports.getRandomCourses = getRandomCourses;
module.exports.getCourseByDCS = getCourseByDCS;
module.exports.editCourse = editCourse;
module.exports.deleteCourse = deleteCourse;
module.exports.createCourse = createCourse;
module.exports.getCourseAttended = getCourseAttended;