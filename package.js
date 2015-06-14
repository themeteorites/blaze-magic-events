Package.describe({
  name: 'blaze-magic-events',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/themeteorites/blaze-magic-events',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2')
  api.use(['grigio:babel', 'blaze', 'stevezhu:lodash'], 'client')
  api.addFiles('events.es6.js', 'client')
})
