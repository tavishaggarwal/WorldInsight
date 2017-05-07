var express = require('express');
var router = express.Router();
var verify = require('./verify');
var Post = require('../Models/Posts');

router.get('/', function (req, res, next) {
    'use strict';
    Post.find({}, function (err, users) {
        if (err) {
            throw err;
        }
        res.json(users);
    });
});


router.post('/add', verify.verifyOrdinaryUser, function (req, res) {
    'use strict';
    Post.create(req.body, function (err, post) {
        if (err) {
            next(err);
        }
        var id = post._id;
            res.status(200).json({
                status: 'Added the post with id: ' + id
            });
    });
});

module.exports = router;