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
        type: String
    },
    lastname: {
        type: String
    },
    randomString: {
        type: String,
        default: null
    },
    userExpires: {
        type: Date,
        default: null
    },
    registered: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,

    facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
  }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);