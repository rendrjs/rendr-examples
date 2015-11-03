var should = require('should'),
    OnlyOddMinuteView = require('../../../app/views/home/only_odd_minute'),
    App = require('../../../app/app');

describe('OnlyOddMinuteView', function() {

  beforeEach(function() {
    this.app = new App({rootPath: '/'});
  });

  it('should have time data in getTemplateData', function() {
    var time = this.app.getTimeLoaded();
    var view = new OnlyOddMinuteView({ app: this.app });
    var data = view.getTemplateData();
    data.should.have.property('time', time);
  });

  it('should have minute data in getTemplateData', function() {
    var minute = this.app.getMinuteLoaded();
    var view = new OnlyOddMinuteView({ app: this.app });
    var data = view.getTemplateData();
    data.should.have.property('minute', minute);
  });
});
