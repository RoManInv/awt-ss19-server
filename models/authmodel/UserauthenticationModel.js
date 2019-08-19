const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userAuthenticationSchema = new Schema({

    email: { type: String, required: true },
    password: { type: String, required: true }
});



//Export model
module.exports = mongoose.model('userAuthentication', userAuthenticationSchema);
