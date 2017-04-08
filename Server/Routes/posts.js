var express = require('express');
var router = express.Router();
var verify = require('./verify');

router.get('/', function (req, res, next) {
    'use strict';
    res.send('Posts coming soon');
});

module.exports = router;