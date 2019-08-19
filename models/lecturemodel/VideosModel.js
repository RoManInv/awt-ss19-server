const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var videosSchema = new Schema({

    name: { type: String, required: false },
    courseId: { type: ObjectId, required: false },
    description: { type: String, required: false },
    url: { type: String, required: false }
});



//Export model
module.exports = mongoose.model('Videos', videosSchema);
