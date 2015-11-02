define([
  'app/models/base'
], function(Base)
{
  var exports = Base.extend({
    url: '/repos/:owner/:name',
    idAttribute: 'name'
  });
  exports.id = 'repos_bundle/repo';

  return exports;
});
