const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var CourseSchema = new Schema({

    name: { type: String, required: false },
    category: { type: String, required: false },
    subject: { type: String, required: false },
    degree: { type: String, required: false },
    description: { type: String, required: false },
    shortDescription: { type: String, required: false },
    author: { type: ObjectId, required: false }
});



//Export model
module.exports = mongoose.model('Course', CourseSchema);
