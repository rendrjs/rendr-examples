define([
  'app/views/base_page',
  'app/views/users_bundle/user_repos_view'
], function(BaseView)
{

  var exports = BaseView.extend({
    className: 'users_show_view',

    getTemplateData: function() {
      var data = BaseView.prototype.getTemplateData.call(this);
      data.repos = this.options.repos;
      return data;
    }
  });
  exports.id = 'users_bundle/users/show';

  return exports;

});
