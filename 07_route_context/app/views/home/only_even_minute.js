var BaseView = require('../base');

module.exports = BaseView.extend({
  className: 'home_only_even_minute_view',
  
  getTemplateData: function() {
    var data = BaseView.prototype.getTemplateData.call(this);

    data.time = this.app.getTimeLoaded();
    data.minute = this.app.getMinuteLoaded();

    return data;
  }
});
module.exports.id = 'home/only_even_minute';
