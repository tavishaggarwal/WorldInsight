var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../Models/Users');
var verify = require('./verify');
var Mailsender = require('./../MailSender/signUpVerify');
var randomstring = require("randomstring");
var config = require("./../config");

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

/* POST Register new user. */
router.post('/register', function (req, res) {
    'use strict';
    
    User.register(new User({ username : req.body.username, firstname: req.body.firstname, lastname: req.body.lastname,
    randomString:randomstring.generate(),userExpires:Date.now(), registered: false }), req.body.password, function (err, user) {
            if (err) {
                return res.status(500).json({err: err});
            }
            passport.authenticate('local')(req, res, function () {
                const token = user.randomString;
                const URL = `https://${req.get('host')}/users/auth/${token}`;
                Mailsender.mailOptions = {
                    from: '"World Insights" <Tavish@WorldInsight.com>',
                    to: req.body.username, // list of receivers
                    subject: 'Thanks for Signing Up to World Insight', // Subject line
                    text: '', // plain text body
                    html: `Hello ${req.body.firstname || 'Friend'},<br /> <p>Thank you for Signing Up to World 
                    Insight. Hope you enjoy to be part of community and have a good time here.
                    Click the following link to confirm your account:</p><p>${URL}</p>
                    <p>The above link will be valid for 15 minutes. Please confirm your account before that.</p>
                    If you have any questions or comments about the content you’re receiving please 
                    email back and we will respond to your inquiry promptly.</p><br />Sincerely,<br />
                    Tavish Aggarwal<br /> Chief Executive Officer- World Insight`
                };
                if (true == config.mailSend) {
                Mailsender.sendMail(Mailsender.mailOptions);
                }
                 res.status(200).json({status: 'Kindly verify email to login'});
            });
        });
});

router.get('/auth/:authtoken', function (req, res, next) {
    'use strict';

    if(`https://${req.get('host')}`==(config.Domain))
    {
        User.findOne({randomString:req.params.authtoken}, function (err, user) {
            if (user) {
                let expireDate = new Date(user.userExpires);
                expireDate.setMinutes(expireDate.getMinutes() + config.tokenExpire);
                    if(Date.now() < expireDate) {
                        user.registered = true;
                        user.randomString  = undefined;
                        user.userExpires = undefined;
                    
                        user.save(function (err) {
                        if(err) {
                            console.error('ERROR!');
                        }
                    });
                    } else {
                        res.status(200).json({message: 'Verification link expired'});
                    }
            } else {
                 res.status(200).json({message: 'Either Verification token has expired or token is not valid'});
             }
            next();
    });
    } else {
         res.status(200).json({message: 'Please click the correct authentication URL'});
    }
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
            if (err || false == user.registered) {
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

router.post('/forgetPassword', function (req, res) {
    'use strict';
    User.findOne({username: req.body.username},function (err, user){
        if(err) {
            console.error('ERROR!');
        }

        if(user) {
            const token = user.resetPasswordToken = randomstring.generate();
            user.resetPasswordExpires = Date.now();
            user.save(function (err) {
                if(err) {
                    console.log(err);
                }
                const URL = `https://${req.get('host')}/forgetPassword/${token}`;
                    Mailsender.mailOptions = {
                        from: '"World Insights" <Tavish@WorldInsight.com>',
                        to: req.body.username, // list of receivers
                        subject: 'World Insight: Forgot Password', // Subject line
                        text: '', // plain text body
                        html: `Hello ${req.body.firstname || 'Friend'},<br /> <p>
                        Click the following link to reset your password:</p><p>${URL}</p>
                        If you have any questions or comments about the content you’re receiving please 
                        email back and we will respond to your inquiry promptly.</p><br />Sincerely,<br />
                        Tavish Aggarwal<br /> Chief Executive Officer- World Insight`
                    };
                    if (true == config.mailSend) {
                        Mailsender.sendMail(Mailsender.mailOptions);
                    }
                     res.status(200).json({status: 'Kindly check your mailbox to reset your password'});
            });
            } else {
                res.status(400).json({message: 'User doesnt exist. Please Register yourself on World Insight'});
            
            }
    });
});

router.put('/forgetPassword/:passwordresetToken', function (req, res) {
    'use strict';
    if(`https://${req.get('host')}`==(config.Domain))
    {
        User.findOne({resetPasswordToken:req.params.passwordresetToken}, function (err, user) {
            if (user) {
                let expireDate = new Date(user.resetPasswordExpires);
                expireDate.setMinutes(expireDate.getMinutes() + config.tokenExpire);
                    if(Date.now() < expireDate) {
                        user.setPassword(req.body.password, function() {
                            // user.resetPasswordToken = undefined;
                           // user.resetPasswordExpires = undefined;
                            user.save();
                            res.status(200).json({message: 'password reset successful'});
                        });
                    } else {
                        res.status(200).json({message: 'Password Reset link expired'});
                    }
            } else {
                res.status(200).json({message: 'Either Verification token has expired or token is not valid'});
             }
    });
    } else {
         res.status(200).json({message: 'Please click the correct authentication URL'});
    }
});

router.get('/logout', function (req, res) {
    'use strict';
    req.logout();
    res.status(200).json({status: 'Successfully Logged Out'});
});

module.exports = router;