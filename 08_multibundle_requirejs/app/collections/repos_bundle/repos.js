define([
  'app/models/repos_bundle/repo',
  'app/collections/base'
], function(Repo, Base)
{
  var exports = Base.extend({
    model: Repo,
    url: function() {
      if (this.params.user != null) {
        return '/users/:user/repos';
      } else {
        return '/repositories';
      }
    }
  });
  exports.id = 'repos_bundle/repos';

  return exports;

});
