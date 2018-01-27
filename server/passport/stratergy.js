var config = require("./../config");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook');
var User = require('.././Models/Users');
var randomstring = require("randomstring");

module.exports = function(passport) {

    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    passport.use(new FacebookStrategy({  
        clientID: config.FACEBOOK_APP_ID || process.env.FACEBOOK_APP_ID,
        clientSecret: config.FACEBOOK_APP_SECRET || process.env.FACEBOOK_APP_SECRET,
        callbackURL: config.FACEBOOK_CALLBACK_URL,
        profileFields: ['email', 'first_name', 'last_name'],
    },
    function(token, refreshToken, profile, done) {
        process.nextTick(function() {
        User.findOne({ 'facebook.id': profile.id }, function(err, user) {

            if (err)
            return done(err);
            if (user) {
            return done(null, user);
            } else {
            var newUser = new User();
            newUser.facebook.id = profile.id;
            newUser.facebook.token = token;
            newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
            newUser.facebook.email = profile.emails[0].value;
            newUser.randomString = randomstring.generate();
            newUser.userExpires = Date.now();

            newUser.save(function(err) {
                if (err) {
                    throw err;
                }
                
                return done(null, newUser);
            });
            }
        });
        });
    }));
}