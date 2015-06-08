var moment = require('moment');
//  request = require('request'), // Include request to call to the API

var SessionUtils = function() {};

SessionUtils = {

  setSessionDataIfNecessary: function(req, callback) {

    // if you need sessionData
    // var sessionData = req.session.data;
    var _this = this;

    if (this.shouldFetchDataForApp()) {
      this.fetchContext(function(err, response) {
        if (err) return;

        _this.setSessionDataFromApiContext(req, response);

        callback();
      });
    } else {
      callback();
    }
  },

  /**
   * Whether to fetch data for the app
   */
  shouldFetchDataForApp: function() {
    // Here, there could be conditions for if the context should be 
    // refetched, for example if a token is going to expire.
    // For this example, just set it to true.
    var shouldFetch = true;
    return shouldFetch;
  },

  setSessionDataFromApiContext: function(req, response) {
    req.updateSession('minute', response.minute);
    req.updateSession('time', response.time);
  },

  /**
   * Pull back the context for our API.
   */
  fetchContext: function(callback) {

    // Here, we would normally do a request to our API Server.
    // try {
    //   request({
    //     url: url,
    //     method: 'GET'
    //   }, function(err, res, response) {
    //     response = JSON.parse(response);
    //     if (!err && res.statusCode == 200) {
    //         callback(null, response);
    //     } else {
    //         callback(err, response);
    //     }
    //   });
    // } catch (err) {
    //   debug(err);
    //   callback(null, null);
    // }

    // But, instead we just return the minute.
    var currMoment = moment();
    callback(null, 
      { 
        time: currMoment.format('HH:mm:ss'),
        minute: currMoment.minute()
      });
  }
};

module.exports = SessionUtils;