Package.describe({
  name: 'themeteorites:blaze-magic-events',
  version: '0.0.5',
  // Brief, one-line summary of the package.
  summary: 'Adds angular2/react style event handler binding to Blaze.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/themeteorites/blaze-magic-events',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.2.1')
  api.use(['blaze', 'ecmascript', 'stevezhu:lodash@4.0.0'], 'client')
  api.addFiles('events.js', 'client')
  api.export('__magicEvent')
})
