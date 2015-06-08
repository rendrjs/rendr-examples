var BaseApp = require('rendr/shared/app'),
    Session = require('./models/session'),
    handlebarsHelpers = require('./lib/handlebarsHelpers');

/**
 * Extend the `BaseApp` class, adding any custom methods or overrides.
 */
module.exports = BaseApp.extend({

  /**
   * Client and server.
   *
   * `initialize` is called on app initialize, both on the client and server.
   * On the server, an app is instantiated once for each request, and in the
   * client, it's instantiated once on page load.
   *
   * This is a good place to initialize any code that needs to be available to
   * app on both client and server.
   */
  initialize: function() {
    /**
     * Register our Handlebars helpers.
     *
     * `this.templateAdapter` is, by default, the `rendr-handlebars` module.
     * It has a `registerHelpers` method, which allows us to register helper
     * modules that can be used on both client & server.
     */
    this.templateAdapter.registerHelpers(handlebarsHelpers);
  },

  /**
   * Client-side only.
   *
   * `start` is called at the bottom of `__layout.hbs`. Calling this kicks off
   * the router and initializes the application.
   *
   * Override this method (remembering to call the superclass' `start` method!)
   * in order to do things like bind events to the router, as shown below.
   */
  start: function() {
    // Show a loading indicator when the app is fetching.
    this.router.on('action:start', function() { this.set({loading: true});  }, this);
    this.router.on('action:end',   function() { this.set({loading: false}); }, this);

    // Call 'super'.
    BaseApp.prototype.start.call(this);
  },

 getSessionModel: function() {
    var cachedSessionModel = this.fetcher.modelStore.get('Session', 1);
    if (cachedSessionModel) {
      return cachedSessionModel;
    } else {
      // Then, let's pull the bootstrapped version from the middleware
      var session = this.get('session');
      session = session || {};
      session.id = 1; // make the id 1 for now.
      // Then, we convert it to model before we set it.
      var sessionModel = new Session(session, {
          app: this
      });
      return sessionModel;
    }
  },

  refreshSessionModel: function(callback) {
    // if this is server side, just run callback
    if (this.req) {
      callback();
    // if this is client side, fetch fresh session model first
    } else {
      this.getSessionModel().fetch({
        success: function(model) {
          model.store();

          if (callback) {
            callback();
          }
        }
      });
    }
  },

  getTimeLoaded: function() {
    return this.getSessionModel().get('time');
  },
  
  getMinuteLoaded: function() {
    return this.getSessionModel().get('minute');
  }
});
