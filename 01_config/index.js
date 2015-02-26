var express = require('express')
  , rendr = require('rendr')
  , config = require('config')
  , compress = require('compression')
  , bodyParser = require('body-parser')
  , serveStatic = require('serve-static')
  , app = express();

/**
 * Initialize our Rendr server.
 */
var server = rendr.createServer({
  dataAdapterConfig: config.api,
  appData: config.appData
});

/**
 * Initialize Express middleware stack.
 */
server.configure(function (expressApp) {
  expressApp.use(compress());
  expressApp.use(serveStatic(__dirname + '/public'));
  expressApp.use(bodyParser.json());
});

app.use('/', server.expressApp);

/**
 * Start the Express server.
 */
function start(){
  var port = process.env.PORT || config.server.port;
  app.listen(port);
  console.log("server pid %s listening on port %s in %s mode",
    process.pid,
    port,
    app.get('env')
  );
}


/**
 * Only start server if this script is executed, not if it's require()'d.
 * This makes it easier to run integration tests on ephemeral ports.
 */
if (require.main === module) {
  start();
}

exports.app = app;
