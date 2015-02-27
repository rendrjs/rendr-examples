var express = require('express')
  , rendr = require('rendr')
  , config = require('config')
  , compress = require('compression')
  , bodyParser = require('body-parser')
  , serveStatic = require('serve-static')
  , cookieParser = require('cookie-parser')
  , session = require('express-session')
  , mw = require('./server/middleware')
  , app = express();

/**
 * Initialize Express middleware stack.
 */
app.use(compress());
app.use(serveStatic(__dirname + '/public'));
app.use(bodyParser.json());

/**
 * The `cookieParser` middleware is required for sessions.
 */
app.use(cookieParser());

/**
 * Add session support. This will populate `req.session`.
 */
app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: true
}));

/**
 * Initialize our Rendr server.
 */
var server = rendr.createServer({
  dataAdapterConfig: config.api
});

/**
  * To mount Rendr, which owns its own Express instance for better encapsulation,
  * simply add `server` as a middleware onto your Express app.
  * This will add all of the routes defined in your `app/routes.js`.
  * If you want to mount your Rendr app onto a path, you can do something like:
  *
  *     app.use('/my_cool_app', server);
  */
app.use('/', server.expressApp);

server.configure(function(rendrExpressApp) {

  /**
   * Allow the Rendr app to access session data on client and server.
   * Check out the source in the file `./server/middleware/initSession.js`.
   */
  rendrExpressApp.use(mw.initSession());

  /**
   * Increment a counter in the session on every page hit.
   */
  rendrExpressApp.use(mw.incrementCounter());
});

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
