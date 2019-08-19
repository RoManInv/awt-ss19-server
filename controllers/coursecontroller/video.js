const video = require('../../models/lecturemodel/VideosModel');

//add video into db
function createVideo(req, res) {
    var newVideo = req.body.video;
    if (req.query.id) {
        newVideo.id = req.query.id;
    }
    var newVideoSchema = new video(newVideo);
    newVideoSchema.save((err, result) => {
        if (err) {
            res.header("Access-Control-Allow-Origin", "*")
                .status(400)
                .json({
                    msg: 'Video Create Failed'
                });
        } else {
            res.header("Access-Control-Allow-Origin", "*")
                .status(200)
                .json({
                    video: result,
                    msg: 'Video Create Success'
                });
        }
    });
}

//edit video info
function editVideo(req, res) {
    if (!req.params.id) {
        res.header("Access-Control-Allow-Origin", "*")
            .status(400)
            .json({
                msg: 'Video ID must be specified'
            });
    } else {
        if (!req.body.video) {
            res.header("Access-Control-Allow-Origin", "*")
                .status(400)
                .json({
                    msg: 'Video must be specified'
                });
        } else {
            var newVideo = req.body.video;
        }
    }
    var id = req.params.id;
    video.findOneAndUpdate({ _id: id }, newVideo, (err, result) => {
        if (err) {
            res.header("Access-Control-Allow-Origin", "*")
                .status(400)
                .json({
                    msg: 'Video Edit Failed'
                });
        } else {
            res.header("Access-Control-Allow-Origin", "*")
                .status(200)
                .json({
                    msg: 'Video Edit Success'
                });
        }
    });
}

//get video
function getVideo(req, res) {
    var id = req.params.id;
    if (!id) {
        res.header("Access-Control-Allow-Origin", "*")
            .status(400)
            .json({
                msg: 'Video ID must be specified'
            });
    } else {
        video.findOne({ _id: id }, (err, result) => {
            res.header("Access-Control-Allow-Origin", "*")
                .status(200)
                .json({
                    video: result,
                    msg: 'Search Video Success'
                });
        });
    }
}

function getVideoByCourseId(req, res) {
    var id = req.params.courseid;
    if (!id) {
        res.header("Access-Control-Allow-Origin", "*")
            .status(400)
            .json({
                msg: 'Video ID must be specified'
            });
    } else {
        video.find({ courseId: id }, (err, docs) => {
            res.header("Access-Control-Allow-Origin", "*")
                .status(200)
                .json({
                    video: docs,
                    msg: 'Search Video Success'
                });
        });
    }
}
function getFirstVideo(req, res) {
    var id = req.params.courseid;
    if (!id) {
        res.header("Access-Control-Allow-Origin", "*")
            .status(400)
            .json({
                msg: 'Video ID must be specified'
            });
    } else {
        video.findOne({ courseId: id }, (err, docs) => {
            if (err) {
                res.header("Access-Control-Allow-Origin", "*")
                    .status(401)
                    .json({
                        msg: err
                    });
            } else {
                res.header("Access-Control-Allow-Origin", "*")
                    .status(200)
                    .json({
                        video: docs,
                        msg: 'Search Video Success'
                    });
            }
        });
    }
}

//delete video
function deleteVideo(req, res) {
    var id = req.body.id;
    if (!id) {
        res.header("Access-Control-Allow-Origin", "*")
            .status(400)
            .json({
                msg: 'Video ID must be specified'
            });
    } else {
        video.findOneAndDelete({ _id: id }, (err, result) => {
            if (err) {
                res.header("Access-Control-Allow-Origin", "*")
                    .status(400)
                    .json({
                        msg: 'Delete Video Failed'
                    });
            } else {
                res.header("Access-Control-Allow-Origin", "*")
                    .status(200)
                    .json({
                        msg: 'Delete Video Success'
                    });
            }
        });
    }
}

module.exports.createVideo = createVideo;
module.exports.editVideo = editVideo;
module.exports.getVideo = getVideo;
module.exports.getVideoByCourseId = getVideoByCourseId;
module.exports.deleteVideo = deleteVideo;
module.exports.getFirstVideo = getFirstVideo;