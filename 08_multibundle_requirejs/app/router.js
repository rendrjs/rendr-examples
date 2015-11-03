define([
  'rendr/client/router'
], function(BaseClientRouter)
{
  
  var Router = function Router(options) {
    BaseClientRouter.call(this, options);
  };

  /**
   * Set up inheritance.
   */
  Router.prototype = Object.create(BaseClientRouter.prototype);
  Router.prototype.constructor = BaseClientRouter;

  Router.prototype.initialize = function() {
    this.on('action:start', this.trackImpression, this);
  };

  Router.prototype.trackImpression = function() {
    if (window._gaq) {
      _gaq.push(['_trackPageview']);
    }
  };

  Router.prototype.navigate = function(path, options) {
      // Trigger a navigating event
      this.app.trigger('router:navigating', {
          path: path,
          options: options
      });
      BaseClientRouter.prototype.navigate.call(this, path, options);
  };

  return Router;

});
