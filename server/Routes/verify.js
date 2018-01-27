var User = require('../Models/Users');
var Posts = require('../Models/Posts');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config.js');

exports.getToken = function (user) {
    'use strict';
    return jwt.sign(user, config.secretKey || process.env.secretKey);
};

exports.verifyOrdinaryUser = function (req, res, next) {
    'use strict';
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'], error = null;
    
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey || process.env.secretKey, function (err, decoded) {
            if (err) {
               return res.status(401).json({message: 'You are not Authenticated to perform this action'});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
       return res.status(403).json({message: 'No token provided'});
    }
};

exports.verifyAdmin = function (req, res, next) {
    'use strict';
    var err;
    if (req.decoded) {
        
        if (req.decoded.admin) {
            return next();
        }
        err = new Error('You are not an admin!');
    } else {
        err = new Error('You are not authenticated!');
    }

    err.status = 401;
    return next(err);
};

exports.verifyUser = function (req, res, next) {
    'use strict';
    var err,
        id = req.params.id;
    if (req.decoded) {
        Posts.findById(id, function (err, post) {
            
            if (post) {
                if (post.postedBy === req.decoded.username) {
                    return next();
                } else {
                   return res.status(401).json({message: 'You cannot edit this post'});
                }
            } else {
               return res.status(401).json({message: 'The post you are looking for is either deleted or doesn\'t exist'});
            }
        });
    } else {
       return res.status(401).json({message: 'You are not Authenticated to perform this action'});
    }
};