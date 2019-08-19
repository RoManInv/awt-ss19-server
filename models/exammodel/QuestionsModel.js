const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var QuestiomnsSchema = new Schema({

    examID: { type: ObjectId, required: false },
    question: { type: String, required: false },
    choices: { type: Array, required: false },
    solution: { type: Number, required: false },
    index: { type: Number }
});


//Export model
module.exports = mongoose.model('Questions', QuestiomnsSchema);
