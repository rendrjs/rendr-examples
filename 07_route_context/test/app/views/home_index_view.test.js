var should = require('should'),
    HomeIndexView = require('../../../app/views/home/index'),
    App = require('../../../app/app');

describe('HomeIndexView', function() {

  beforeEach(function() {
    this.app = new App({rootPath: '/'});
  });

  it('should have time data in getTemplateData', function() {
    var time = this.app.getTimeLoaded();
    var view = new HomeIndexView({ app: this.app });
    var data = view.getTemplateData();
    data.should.have.property('time', time);
  });

  it('should have minute data in getTemplateData', function() {
    var minute = this.app.getMinuteLoaded();
    var view = new HomeIndexView({ app: this.app });
    var data = view.getTemplateData();
    data.should.have.property('minute', minute);
  });
});
