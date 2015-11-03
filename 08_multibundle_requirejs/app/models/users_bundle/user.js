define([
  'app/models/base'
], function(Base)
{    
  var exports = Base.extend({
    url: '/users/:login',
    idAttribute: 'login'
  });
  exports.id = 'users_bundle/user';

  return exports;
});
