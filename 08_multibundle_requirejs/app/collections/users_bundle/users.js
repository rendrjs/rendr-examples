define([
  'app/models/users_bundle/user',
  'app/collections/base'
], function(User, Base)
{

  var exports = Base.extend({
    model: User,
    url: '/users'
  });
  exports.id = 'users_bundle/users';

  return exports;

});
