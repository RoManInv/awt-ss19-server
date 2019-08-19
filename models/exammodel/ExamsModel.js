const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var ExamsSchema = new Schema({

    courseId: { type: ObjectId, required: false },
    description: { type: String, required: false }
});


//Export model
module.exports = mongoose.model('Exams', ExamsSchema);
