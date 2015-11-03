require('global-define')({basePath: ''});

var express     = require('express'),
  rendr         = require('rendr'),
  app           = express(),
  bodyParser    = require('body-parser'),
  compression   = require('compression'),
  serveStatic   = require('serve-static'),
  fs            = require('fs'),
  _             = require('underscore'),
  config        = require('config');

/**
 * In this simple example, the DataAdapter config, which specifies host, port, etc. of the API
 * to hit, is written inline. In a real world example, you would probably move this out to a
 * config file. Also, if you want more control over the fetching of data, you can pass your own
 * `dataAdapter` object to the call to `rendr.createServer()`.
 */
var dataAdapterConfig = {
  'default': {
    host: 'api.github.com',
    protocol: 'https'
  },
  'travis-ci': {
    host: 'api.travis-ci.org',
    protocol: 'https'
  }
};

/** 
 * Initialize our Rendr server.
 */
var server = rendr.createServer({
  dataAdapterConfig: dataAdapterConfig
});

server.configure(function (expressApp) {
  expressApp.use(compression());
  expressApp.use(serveStatic(__dirname + '/public'));
  expressApp.use(bodyParser.json());

  expressApp.use(function(req, res, next) {
    if (config && config.has('appData.static.js.mapping')) {
        var app = req.rendrApp;
        var requirejsBundles = {};

        _.each(config.get('appData.static.js.mapping'), function(value, key) {
          if (key !== 'common') {
            /* Format the requireJsBundles to be in the format that requireJs likes:
             * Eg, take the json generated from the multibundle-mapper and multibundle-requirejs:
             * 
             * ...
             * "mapping": {
             *     "user": "/js/user.fce3fb7ac7a6714acc1ad51a28945e4a",
             *     ...
             * },
             * "bundles": {
             *     "user": ["app/models/users_bundle/user", "app/collections/users_bundle/users", "app/views/users_bundle/user_repos_view", "app/views/users_bundle/users/index", "app/views/users_bundle/users/show", "app/controllers/users_bundle/users_controller", "public/js/app/templates/users_bundle/compiledTemplates"],
             *     ...
             * }
             * ...
             *
             * and reformat it to 
             * {
             *     "/js/user.fce3fb7ac7a6714acc1ad51a28945e4a": ["app/models/users_bundle/user", "app/collections/users_bundle/users", "app/views/users_bundle/user_repos_view", "app/views/users_bundle/users/index", "app/views/users_bundle/users/show", "app/controllers/users_bundle/users_controller", "public/js/app/templates/users_bundle/compiledTemplates"],
             *     ...
             * }
             */
            requirejsBundles[value + '.js'] = config.get('appData.static.js.bundles').get(key);
          } else {
            // Add the common path to the app data so that it can be accessed in __layout.hbs
            app.set('commonPath', value + '.js');
          }
        });
        app.set('requirejsBundles', requirejsBundles);
    }
    next();
  });
});

/**
  * To mount Rendr, which owns its own Express instance for better encapsulation,
  * simply add `server` as a middleware onto your Express app.
  * This will add all of the routes defined in your `app/routes.js`.
  * If you want to mount your Rendr app onto a path, you can do something like:
  *
  *     app.use('/my_cool_app', server);
  */
app.use(server.expressApp);

/**
 * Start the Express server.
 */
function start(){
  var port = process.env.PORT || 3030;
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
