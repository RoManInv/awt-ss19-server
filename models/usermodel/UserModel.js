const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({

    userAuthenticationId: { type: Schema.ObjectId, required: true },
    name: { type: String, required: true },
    rank: { type: Number, required: true },
    courses: { type: Array, required: false },
    achievments: { type: Array, required: false },
    email: {type: String, required: false}
});



//Export model
module.exports = mongoose.model('User', UserSchema);
