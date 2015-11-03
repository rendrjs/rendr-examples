define([
  'app/views/base_page'
], function(BaseView)
{

  var exports = BaseView.extend({
    className: 'repos_show_view',

    getTemplateData: function() {
      var data = BaseView.prototype.getTemplateData.call(this);
      data.build = this.options.build.toJSON();
      return data;
    }
  });
  exports.id = 'repos_bundle/repos/show';

  return exports;

});
