define(function(require) {

  var _ = require('underscore');

  return {
    index: function(params, callback) {

      var spec = {
        collection: {collection: 'users_bundle/users', params: params}
      };

      this.app.fetch(spec, function(err, result) {
        callback(err, result);
      });
    },

    show: function(params, callback) {

      var spec = {
        model: {model: 'users_bundle/user', params: params},
        repos: {collection: 'repos_bundle/repos', params: {user: params.login}}
      };

      this.app.fetch(spec, function(err, result) {
        callback(err, result);
      });
    }
  };

});
