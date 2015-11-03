var SessionUtils = require('../sessionUtils'),
  _ = require('underscore');

var Sessions = {
  put: function(req, res, next) {

    if (req.params.id != 1) {
      return res.status(401).send({ message: 'Unauthorized'});
    }

    var newSessionData = req.body;

    if (newSessionData) {
      req.session.data = newSessionData;
    }

    if (newSessionData) {
      SessionUtils.setSessionDataIfNecessary(req, function() {
          return res.status(200).json(req.session.data);
      });
    } else {
      return res.status(200).json(req.session.data);
    }
  },

  get: function(req, res, next) {

    if (req.params.id != 1) {
      return res.status(401).send({ message: 'Unauthorized'});
    }

    res.setHeader('Cache-Control', 'no-cache, must-revalidate');

    SessionUtils.setSessionDataIfNecessary(req, function() {
      return res.json(req.session.data);
    });
  }
};

module.exports = Sessions;