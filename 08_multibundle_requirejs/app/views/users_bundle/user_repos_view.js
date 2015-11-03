define([
  'app/views/base'
], function(BaseView)
{

  var exports = BaseView.extend({
    className: 'user_repos_view'
  });
  exports.id = 'users_bundle/user_repos_view';

  return exports;

});
