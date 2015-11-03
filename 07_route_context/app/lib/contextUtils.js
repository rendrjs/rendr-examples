var ContextUtils = function() {};

ContextUtils = {

  loadBaseData: function(actionHandler) {
    return function() {
      var _arguments = arguments;
      this.app.refreshSessionModel(function() {
          actionHandler.apply(this, _arguments);
      }.bind(this));
    };
  },

  /**
   * An example to show how to limit access based on data stored in our 
   * app.  In this case we only allow access on odd minutes.
   * but it could be when we have a user token.
   */
  ensureOnlyOddMinute: function(actionHandler) {
    return function() {
      var _arguments = arguments;

      this.app.refreshSessionModel(function() {
        var minute = this.app.getMinuteLoaded();
        if ((minute % 2) === 1) {
          actionHandler.apply(this, _arguments);
        } else {
          this.redirectTo('/?message=odd+page+is+not+available');
        }
      }.bind(this));
    };
  },

  /**
   * An example to show how to limit access based on data stored in our 
   * app.  In this case we only allow access on even minutes.
   * but it could be when we have a user token.
   */
  ensureOnlyEvenMinute: function(actionHandler) {
    return function() {
      var _arguments = arguments;

      this.app.refreshSessionModel(function() {
          var minute = this.app.getMinuteLoaded();
          if ((minute % 2) === 0) {
          actionHandler.apply(this, _arguments);
        } else {
          this.redirectTo('/?message=even+page+is+not+available');
        }
      }.bind(this));
    };
  }
};

module.exports = ContextUtils;
