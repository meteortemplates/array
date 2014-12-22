Package.describe({
  name: 'templates:array',
  summary: 'Safe reactive arrays.',
  version: '1.0.0',
  git: 'https://github.com/meteortemplates/array.git'
});

Package.onUse(function(api) {
  api.export('ReactiveArray', 'client');

  api.versionsFrom('METEOR@1.0');

  api.use([
    'check',
    'tracker'
  ], 'client');

  api.addFiles('templates:array.js');

});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('templates:array');
  api.addFiles('templates:array-tests.js');
});
