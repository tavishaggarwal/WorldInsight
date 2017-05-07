var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Posts = new Schema({
    title: String,
    description: String,
    imageLocation: String,
    likeCount: {
        type: String,
        default: 0
    },
    commentCount: {
        type: String,
        default: 0
    }
});

module.exports = mongoose.model('Posts', Posts);