define([
  'app/views/base_page'
], function(BaseView)
{

  var exports = BaseView.extend({
    className: 'repos_index_view'
  });
  exports.id = 'repos_bundle/repos/index';

  return exports;

});
