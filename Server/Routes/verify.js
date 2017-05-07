var User = require('../Models/Users');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config.js');

exports.getToken = function (user) {
    'use strict';
    return jwt.sign(user, config.secretKey || process.env.SECRET_KEY);
};

exports.verifyOrdinaryUser = function (req, res, next) {
    'use strict';
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'], error = null;
    
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey || process.env.SECRET_KEY, function (err, decoded) {
            if (err) {
                error = new Error('You are not authenticated!');
                error.status = 401;
                return next(error);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        error = new Error('No token provided!');
        error.status = 403;
        return next(error);
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