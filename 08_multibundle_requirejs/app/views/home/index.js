define([
  'app/views/base_page'
], function(BaseView)
{

  var exports = BaseView.extend({
    className: 'home_index_view'
  });
  exports.id = 'home/index';

  return exports;

});
