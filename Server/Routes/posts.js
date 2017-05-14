var express = require('express');
var router = express.Router();
var verify = require('./verify');
var Post = require('../Models/Posts');
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/', function (req, res, next) {
    'use strict';
    Post.find({}, function (err, post) {
        if(err) res.status(400);
        res.json(post);
    });
});


router.post('/add', verify.verifyOrdinaryUser, function (req, res) {
    'use strict';
    Post.create(req.body, function (err, post) {
    
        if(err) res.status(400);
        
        if(post) {
        var id = post._id;
            }
            res.status(200).json({
                status: 'Added the post with id: ' + id
            });
    });
});

router.get("/:id", verify.verifyOrdinaryUser, function(req,res){
    var id = req.params.id;

    Post.findOne({'_id': new ObjectId(id)},function(err,docs){
        if(err) res.status(400);
        res.json(docs);
    });
});

router.put('/edit/:id', verify.verifyOrdinaryUser, verify.verifyUser, function (req, res) {
    'use strict';
    var id = req.params.id,
        body = req.body;
   Post.findById(id, function(err, post) {
       
    if(err) res.status(400);
    
    // Render not found error
    if(!post) {
      return res.status(404).json({
        message: 'Post with id ' + id + ' can not be found.'
      });
    }
       
    post.update(body, function(error, post) {
      if(error) res.status(400);
      res.json(post);
    });
  });
});

module.exports = router;