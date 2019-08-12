Package.describe({
  name: 'materialize-messaging',
  version: '0.0.1',
  summary: '',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {

  // both
  api.versionsFrom('1.8.1');
  api.use([
    'ecmascript',
    'dynamic-import',
    'underscore',
    'accounts-base',
    'dburles:mongo-collection-instances@0.3.5',
    'alanning:roles@1.2.16',
  ]);

  // server
  api.mainModule('./access-server.js', 'server');

  // client
  api.use([
    'templating@1.3.2',
  ], 'client')

  api.mainModule('materialize-messaging.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('materialize-messaging');
  api.mainModule('materialize-messaging-tests.js');
});
