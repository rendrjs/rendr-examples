define([
  'app/views/base_page'
], function(BaseView)
{
  
  var exports = BaseView.extend({
    className: 'users_index_view'
  });
  exports.id = 'users_bundle/users/index';

  return exports;

});
