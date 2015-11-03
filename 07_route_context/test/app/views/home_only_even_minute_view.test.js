var should = require('should'),
    OnlyEvenMinuteView = require('../../../app/views/home/only_even_minute'),
    App = require('../../../app/app');

describe('OnlyEvenMinuteView', function() {

  beforeEach(function() {
    this.app = new App({rootPath: '/'});
  });

  it('should have time data in getTemplateData', function() {
    var time = this.app.getTimeLoaded();
    var view = new OnlyEvenMinuteView({ app: this.app });
    var data = view.getTemplateData();
    data.should.have.property('time', time);
  });

  it('should have minute data in getTemplateData', function() {
    var minute = this.app.getMinuteLoaded();
    var view = new OnlyEvenMinuteView({ app: this.app });
    var data = view.getTemplateData();
    data.should.have.property('minute', minute);
  });
});
