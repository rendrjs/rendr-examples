var express = require('express'),
  rendr = require('rendr'),
  bodyParser = require('body-parser'),
  config = require('config'),
  compress = require('compression'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),  
  serveStatic = require('serve-static'),
  mw = require('./server/middleware'),
  fs = require('fs'),
  path = require('path'),
  app = express();

/**
 * Initialize our Rendr server.
 */
var server = rendr.createServer({
  dataAdapterConfig: config.api,
  appData: config.appData
});


app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(serveStatic(__dirname + '/public'));

app.use(cookieParser(config.session.secret));
app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: true
}));

/**
 * Initialize Express middleware stack.
 */
server.configure(function (expressApp) {
  expressApp.use(mw.initSession());

  expressApp.use(mw.fetchContextForApp({
    routes: server.router.buildRoutes()
  }));

  // Add server controllers
  var controllersDirPath = './server/controllers/';
  var controller = {};
  fs.readdirSync(controllersDirPath).forEach(function(controllerFile) {
      var controllerName = controllerFile.split('.')[0];
      controller[controllerName] = require(controllersDirPath + controllerFile);
  });

  expressApp.get('/sessions/:id', controller.sessions.get);
  expressApp.put('/sessions/:id', controller.sessions.put);
});

app.use('/', server.expressApp);

/**
 * Start the Express server.
 */
function start() {
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
