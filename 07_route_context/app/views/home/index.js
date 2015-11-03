var BaseView = require('../base');

module.exports = BaseView.extend({
  className: 'home_index_view',

  getTemplateData: function() {
    var data = BaseView.prototype.getTemplateData.call(this);

    data.time = this.app.getTimeLoaded();
    data.minute = this.app.getMinuteLoaded();

    return data;
  }
});
module.exports.id = 'home/index';
