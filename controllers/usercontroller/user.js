const user = require('../../models/usermodel/UserModel');
const course = require('../../models/lecturemodel/CourseModel');
const ObjectId = require('mongoose').Types.ObjectId;
//get user
function getUser(req, res) {
    var id = req.params.id;
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
                res.header("Access-Control-Allow-Origin", "*")
                    .status(200)
                    .json({
                        user: result,
                        msg: 'Search User Success'
                    });
            }
        });
    }
}
//edit user info
function editUser(req, res) {
    var id = req.params.id;
    if (!id) {
        res.header("Access-Control-Allow-Origin", "*")
            .status(400)
            .json({
                msg: 'User ID must be specified'
            });
    } else {
        var newUser = req.body.user;
        user.findOneAndUpdate({ _id: id }, newUser, (err, result) => {
            if (err) {
                res.header("Access-Control-Allow-Origin", "*")
                    .status(400)
                    .json({
                        msg: 'Edit User Failed'
                    });
            } else {
                res.header("Access-Control-Allow-Origin", "*")
                    .status(200)
                    .json({
                        user: result,
                        msg: 'Edit User Success'
                    });
            }
        });
    }
}

//create user
function createUser(req, res, callback) {
    var user = req.body.user;
    if (!user) {
        callback("User info should be specified");
    } else {
        user.create(user, (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        });
    }
}

//delete user
function deleteUser(req, res) {
    var id = req.params.id;
    if (!id) {
        res.header("Access-Control-Allow-Origin", "*")
            .status(400)
            .json({
                msg: 'User ID must be specified'
            });
    } else {
        user.findOneAndDelete({ _id: id }, (err, result) => {
            if (err) {
                res.header("Access-Control-Allow-Origin", "*")
                    .status(400)
                    .json({
                        msg: 'User Delete Failed'
                    });
            } else {
                res.header("Access-Control-Allow-Origin", "*")
                    .status(200)
                    .json({
                        msg: 'User Delete Success'
                    });
            }
        });
    }
}

//add rank to user
function addRank(req, res) {
    var id = req.body.userId;
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
                user.findOneAndUpdate({ userAuthenticationId: id }, { $set: { rank: ++result.rank } }, (err, result2) => {
                    if (err) {
                        res.header("Access-Control-Allow-Origin", "*")
                            .status(400)
                            .json({
                                msg: 'Edit User Failed'
                            });
                    } else {
                        res.header("Access-Control-Allow-Origin", "*")
                            .status(200)
                            .json({
                                user: result2,
                                msg: 'Edit User Success'
                            });
                    }
                });
            }
        });
    }
}
//attend course
function attendCourse(req, res) {
    let id = req.body.userId;
    let courseId = req.body.courseId;

    if (!id) {
        res.header("Access-Control-Allow-Origin", "*")
            .status(400)
            .json({
                msg: 'User ID must be specified'
            });
    } else {
        user.update({ userAuthenticationId: id }, { $addToSet: { courses: courseId } }, (err, result2) => {
            if (err) {
                res.header("Access-Control-Allow-Origin", "*")
                    .status(400)
                    .json({
                        msg: 'Edit User Failed'
                    });
            } else {
                console.log(result2);
                
                res.header("Access-Control-Allow-Origin", "*")
                    .status(200)
                    .json({
                        user: result2,
                        msg: 'Edit User Success'
                    });
            }
        });
    }
}

module.exports.getUser = getUser;
module.exports.editUser = editUser;
module.exports.createUser = createUser;
module.exports.deleteUser = deleteUser;
module.exports.addRank = addRank;
module.exports.attendCourse = attendCourse;