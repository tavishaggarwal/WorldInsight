var mongo = {};
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var cfenv = require('cfenv');
var appenv = cfenv.getAppEnv();
var services = appenv.services;
var mongodb_services = services["compose-for-mongodb"];
var Config = require('./config');

if (mongodb_services) {
    var credentials = mongodb_services[0].credentials;
    var ca = [new Buffer(credentials.ca_certificate_base64, 'base64')];
    mongo.url = credentials.uri;
    
    mongo.options = {
        mongos: {
            ssl: true,
            sslValidate: true,
            sslCA: ca,
            poolSize: 1,
            reconnectTries: 1
        }
    };
} else {
    mongo = {
        "url" : Config.dataSource || process.env.dataSource,
        "options": {}
    };
}

// Function to connect to mongoDB
var connectDatabase = function () {
    'use strict';
    mongoose.connect(mongo.url, mongo.options);
    var db = mongoose.connection;
    
    // If the connection throws an error
    db.on('error', console.error.bind(console, 'connection error:'));
    
    db.once('open', function () {
        // We're connected!
        console.log("connected to database");
    });
};
                    
module.exports = connectDatabase;