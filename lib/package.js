Package.describe({
  name: 'mozfet:materialize-messaging',
  version: '0.0.2',
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
    'mozfet:access@0.1.0'
  ]);
  api.mainModule('materialize-messaging.js');

  // client
  api.use([
    'session',
    'templating@1.3.2',
  ], 'client')
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
