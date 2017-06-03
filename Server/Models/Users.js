var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String,
    admin: {
        type: Boolean,
        default: false
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    randomString: {
        type: String
    },
    userExpires: Date,
    registered: {
        type: Boolean,
        default: false
    }, 
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);