var cfenv = require("cfenv");
var mydb;

// load local VCAP configuration  and service credentials
var vcapLocal;

var connectDatabase = function () {
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
}
module.exports = connectDatabase;