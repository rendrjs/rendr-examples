define(function(require) {

  var BaseView = require('./base'),
    _ = require('underscore');

  var exports = BaseView.extend({

    initialize: function() {
      BaseView.prototype.initialize.call(this);
      this.events = _.extend({}, this.events, BaseView.prototype.events, this.events);

      var isServer = typeof window === 'undefined';

      if (!isServer) {
        this.listenTo(this.app, 'router:navigating', this._addPageNavigating.bind(this));
      }
    },

    _addPageNavigating: function(app) {
      $(this.el).addClass('navigating');
    }
  });
  return exports;
});
