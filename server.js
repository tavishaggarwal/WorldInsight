var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var mydb;

// load local VCAP configuration  and service credentials
var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);

if (appEnv.services['cloudantNoSQLDB']) {
  // Load the Cloudant library.
  var Cloudant = require('cloudant');

  // Initialize database with credentials
  var cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);

  //database name
  var dbName = 'worldinsight';

  // Create a new "WorldInsight" database.
  
  // cloudant.db.create(dbName, function(err, data) {
  //   if(!err) //err if database doesn't already exists
  //     console.log("Created database: " + dbName);
  //     else{
  //       console.log(err);
  //     }
  // });

  // Specify the database we are going to use (WorldInsight)...
  mydb = cloudant.db.use(dbName);
}


//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/public'));

app.get('/posts', function(req, res, next) {
    res.send('Posts coming soon');
});

app.get('*', function(req, res, next) {
    res.sendfile('/public/index.html', {root: __dirname });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
