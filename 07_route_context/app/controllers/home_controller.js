var ContextUtils = require('../lib/contextUtils');

module.exports = {
  index: ContextUtils.loadBaseData(function(params, callback) {
    callback(null, params);
  }),

  only_even_minute: ContextUtils.ensureOnlyEvenMinute(function(params, callback) {
    callback(null, params);
  }),

  only_odd_minute: ContextUtils.ensureOnlyOddMinute(function(params, callback) {
    callback(null, params);
  })
};
