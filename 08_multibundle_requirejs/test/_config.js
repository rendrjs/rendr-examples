// Because it's run recursively, this file will run early because of the file name.

var path = require('path');
require('global-define')({
    forceUpstream: true,
    basePath: path.join(__dirname, '..')
});
