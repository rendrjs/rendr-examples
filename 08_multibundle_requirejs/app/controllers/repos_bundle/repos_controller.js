define(function(require)
{

  return {
    index: function(params, callback) {

      var spec = {
        collection: {collection: 'repos_bundle/repos', params: params}
      };

      this.app.fetch(spec, function(err, result) {
        callback(err, result);
      });
    },

    show: function(params, callback) {

      var spec = {
        model: {model: 'repos_bundle/repo', params: params, ensureKeys: ['language', 'watchers_count']},
        build: {model: 'repos_bundle/build', params: params}
      };

      this.app.fetch(spec, function(err, result) {
        callback(err, result);
      });

    }
  };

});
