var express = require('express');
var router = express.Router();
var verify = require('./verify');
var Post = require('../Models/Posts');
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/', function (req, res, next) {
    'use strict';
    Post.find({}, function (err, post) {
        if (err) {
           return res.status(500).json({message: 'Error Occured while fetching posts. Please try again after some time'});
        }
        res.json(post);
    });
});


router.post('/add', verify.verifyOrdinaryUser, function (req, res) {
    'use strict';
    Post.create(req.body, function (err, post) {
    
        if (err) {
           return res.status(500).json({message: 'Post already exists and new post cannot be added with same ID'});
        }

        if (post) {
            var id = post._id;
        } else {
           return res.status(500).json({message: 'You cannot add this post. Please try again after some time'});
        }
       return res.status(200).json({status: 'Added the post with id: ' + id});
    });
});

router.get("/:id", verify.verifyOrdinaryUser, function (req, res) {
    'use strict';
    var id = req.params.id;

    Post.findOne({'_id': new ObjectId(id)}, function (err, docs) {
        if (err) {
           return res.status(500).json({message: 'Error Occured while fetching post. Please try again after some time'});
        }
        res.json(docs);
    });
});

router.put('/edit/:id', verify.verifyOrdinaryUser, verify.verifyUser, function (req, res) {
    'use strict';
    var id = req.params.id,
        body = req.body;
    Post.findById(id, function (err, editedPost) {
       
        if (err) {
           return res.status(500).json({message: 'Error Occured while updating post. Please try again after some time'});
        }
    
        // Render not found error
        if (!editedPost) {
            return res.status(404).json({message: 'Post with id ' + id + ' can not be found.'});
        }
       
        editedPost.update(body, function (error, updatedPost) {
            if (error) {
               return res.status(500).json({message: 'Error Occured while updating post. Please try again after some time'});
            }
            res.json(updatedPost);
        });
    });
});

router.delete('/delete/:id', verify.verifyOrdinaryUser, verify.verifyUser, function (req, res) {
    'use strict';
    var id = req.params.id,
        body = req.body;
    Post.findById(id, function (err, deletedPost) {
       
        if (err) {
           return res.status(500).json({message: 'Error Occured while fetching post. Please try again after some time'});
        }
    
        // Render not found error
        if (!deletedPost) {
            return res.status(404).json({message: 'Post with id ' + id + ' can not be found.'});
        }
       
        deletedPost.remove(body, function (error, postDeleted) {
            if (error) {
              return res.status(500).json({message: 'Error Occured while deleting post. Please try again after some time'});
            }
           return res.status(200).json({ message: 'Post is deleted successfully'});
        });
    });
});

module.exports = router;