var Base = require('./base');

module.exports = Base.extend({
    url: '/sessions/:id',
    api: 'local'
});
module.exports.id = 'Session';