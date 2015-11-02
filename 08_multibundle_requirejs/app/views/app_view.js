define([
  'rendr/client/app_view'
], function(BaseAppView)
{
   
  var $body = $('body');

  return BaseAppView.extend({
    initialize: function() {
      this.app.on('change:loading', function(app, loading) {
        $body.toggleClass('loading', loading);
      }, this);
    }
  });

});
