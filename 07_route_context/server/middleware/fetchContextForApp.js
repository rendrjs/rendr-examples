var _ = require('underscore'),
  Backbone = require('backbone'),
  SessionUtils = require('../sessionUtils');

module.exports = function fetchContextForApp(options) {
  options = options || {};

  return function fetchContextForApp(req, res, next) {
    if (options && options.routes) {
      var routes = options.routes;
      var Router = Backbone.Router;

      // Fetch context only for routes requests
      var match = _.chain(routes)
        .map(function(route) { return Router.prototype._routeToRegExp(_.first(route)); })
        .any(function(regexpRoute) { return regexpRoute.test(req.url); })
        .value();

      if (match) {
        SessionUtils.setSessionDataIfNecessary(req, function() {
          next();
        });
      } else {
        next();
      }
    } else {
      next();
    }
  };
};