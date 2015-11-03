require([
  'underscore',
  'handlebars',
  'app/routes',
  'rendr-handlebars',
  'rendr/shared/modelUtils',
], function() {

  /**
   * App dependencies needed on every page
   */
  var dependencies = [
    'app/app',
    'app/templates/compiledTemplates'
  ];

  /**
   * Examine the bootstrapped data for models and collections we need
   * to require.
   */
  var ModelUtils = require('rendr/shared/modelUtils'),
    modelUtils = new ModelUtils(''),
    _ = require('underscore'),
    bundles = {};

  // Add the require js bundle config here.
  // In this example, this data is written into the app in index.js
  if (appNS && appNS.appData) {
    require.config({bundles: appNS.appData.requirejsBundles});
  }

  _.each(appNS.bootstrappedData, function(data) {
    if (data.summary.collection) {
      dependencies.push(modelUtils.getFullPath('collection', data.summary.collection));
    } else if (data.summary.model) {
      dependencies.push(modelUtils.getFullPath('model', data.summary.model));
    }
  });

  require(dependencies, function(App) {
    // global reference
    var app = window.app = new App(appNS.appData);
    app.bootstrapData(appNS.bootstrappedData);
    app.start();
  });
});
