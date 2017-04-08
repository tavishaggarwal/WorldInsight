var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../Models/Users');
var verify = require('./verify');

/* GET users listing. */
router.get('/', verify.verifyOrdinaryUser,verify.verifyAdmin, function (req, res, next) {
    'use strict';
    User.find({}, function (err, users) {
        if (err) {
            throw err;
        }
        res.json(users);
    });
});

router.post('/register', function (req, res) {
    'use strict';
    
    User.register(new User({ username : req.body.username, firstname: req.body.firstname, lastname: req.body.lastname }),
                  req.body.password, function (err, user) {
            if (err) {
                return res.status(500).json({err: err});
            }
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({status: 'Registration Successful!'});
            });
        });
});

router.post('/login', function (req, res, next) {
    'use strict';
    
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            
            var token = verify.getToken(user);

            res.status(200).json({
                status: 'Login successful!',
                success: true,
                token: token
            });
        });
    })(req, res, next);
});

router.get('/logout', function (req, res) {
    'use strict';
    req.logout();
    res.status(200).json({
        status: 'Successfully Logged Out'
    });
});

module.exports = router;