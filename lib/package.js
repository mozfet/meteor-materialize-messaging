Package.describe({
  name: 'mozfet:materialize-messaging',
  version: '1.0.0',
  summary: 'Material Styled Realtime Reactive Text Messaging with Email Reminders.',
  git: 'https://github.com/mozfet/meteor-materialize-messaging',
  documentation: 'README.md'
});

Package.onUse(function(api) {

  // both
  api.versionsFrom('1.8.1');
  api.use([
    'ecmascript',
    'dynamic-import',
    'underscore',
    'dburles:mongo-collection-instances@0.3.5',
    'aldeed:collection2@3.0.2',
    'aldeed:autoform@6.3.0',
    'matb33:collection-hooks@0.8.4',
    'mozfet:access@0.1.2',
    'mozfet:meteor-logs@1.0.0'
  ]);

  // client
  api.use([
    'session',
    'templating@1.3.2',
    'zimme:active-route@2.3.2',
    'arillo:flow-router-helpers@0.5.2',
    'msavin:parrot@1.3.0'
  ], 'client')
  api.mainModule('client.js', 'client');

  // server
  api.use([
    'email',
    'msavin:sjobs@3.1.1'
  ], 'server')
  api.mainModule('server.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('mozfet:materialize-messaging');
  api.mainModule('materialize-messaging-tests.js');
});

Npm.depends({
  moment: "2.24.0"
});
