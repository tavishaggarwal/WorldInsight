var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../Models/Users');
var verify = require('./verify');
var Mailsender = require('./../MailSender/signUpVerify');

/* GET users listing. */
router.get('/', verify.verifyOrdinaryUser, verify.verifyAdmin, function (req, res, next) {
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
                Mailsender.mailOptions = {
                    from: '"World Insights" <Tavish@WorldInsight.com>',
                    to: req.body.username, // list of receivers
                    subject: 'Thanks for Signing Up to World Insight', // Subject line
                    text: '', // plain text body
                    html: 'Hello ' +req.body.firstname+',<br /> <p>Thank you for Signing Up to World Insight. Hope you enjoy to be part of community and have a good time here. If you have any questions or comments about the content you’re receiving please email back and we will respond to your inquiry promptly.</p><br />Sincerely,<br />Tavish Aggarwal<br /> Chief Executive Officer- World Insight'
                };
                Mailsender.sendMail(Mailsender.mailOptions);
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
            
            var token = verify.getToken({"username": user.username, "_id": user._id, "admin": user.admin});

            res.status(200).json({
                status: 'Login successful!',
                success: true,
                token: token,
                displayname: user.firstname,
                username: user.username
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