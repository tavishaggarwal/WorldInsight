var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser');
var path = require('path');
var connect = require('./connection');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// connect to Mongo DB
connect();

//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/../public'));

app.get('/post', function (req, res, next) {
    'use strict';
    res.send('Posts coming soon');
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