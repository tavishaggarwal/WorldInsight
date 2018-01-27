var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var connect = require('./connection');
var users = require('./Routes/users');
var posts = require('./Routes/posts');
var passport = require('passport');
var passportStratergy = require('./passport/stratergy');
var cors = require('cors');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {

   res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed


    // Pass to next layer of middleware
    next();
});

// connect to Mongo DB
connect();

//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/../public'));


// passport config
app.use(passport.initialize());
passportStratergy(passport);

app.use('/users', users);
app.use('/post', posts);

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
});

app.get('*', function (req, res, next) {
    'use strict';
    res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
    'use strict';
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});