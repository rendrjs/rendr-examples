var should = require('should'),
    Session = require('../../../app/models/session'),
    App = require('../../../app/app');

describe('Session', function() {
  it('should not have time attribute after init', function() {
    var session = new Session({ id: 1 });
    should.not.exist(session.get('time'));
  });

    it('should not have minute attribute after init', function() {
    var session = new Session({ id: 1 });
    should.not.exist(session.get('minute'));
  });
});
