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


router.post('/add',verify.verifyOrdinaryUser, function (req, res) {
    'use strict';
    Post.create(req.body, function (err, post) {
            if (err) {
                next(err);
            }
            console.log('Dish created!');
            var id = post._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the post with id: ' + id);
        });
});

module.exports = router;