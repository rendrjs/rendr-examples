var BaseClientRouter = require('rendr/client/router');

var Router = module.exports = function Router(options) {
  BaseClientRouter.call(this, options);
};

/**
 * Set up inheritance.
 */
Router.prototype = Object.create(BaseClientRouter.prototype);
Router.prototype.constructor = BaseClientRouter;
