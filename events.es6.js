function makeMagicEventHelper (handlerName) {
  return function magicEventHelper (...args) {
    return 'return __magicEvent.bind(this)(typeof arguments !== \'undefined\' ? arguments : null, \'' + handlerName + '\', ' + (args.length ? JSON.stringify(args) : undefined) + ')'
  }
}

__magicEvent = function (args, handlerName, handlerArgs) {
  // make event
  let e = args && args[0] || window.event
  jQuery.event.fix(e)

  // search through view hierarchy for appropriate handler
  let view = Blaze.getView(this)
  do {
    let handler
    if (view.template && _.find(view.template.__eventMaps, map => handler = map[handlerName])) {
      return handler.call(view, e, ...(handlerArgs || []))
    }
  } while ((view = view.parentView))
  // no handler found, nothing to do
}

Meteor.startup(() => {
  // find all defined templates
  let AllTemplates = _.values(Template).filter(t => t instanceof Blaze.Template && t.viewName.indexOf('Template._') === -1)
  // make helpers for all non-delegated/direct event handlers
  AllTemplates.forEach((TheTemplate) => {
    TheTemplate.__eventMaps.forEach(function (map) {
      let helpers = _.reduce(map, (helpers, evtFn, name) => {
        if (name.indexOf(' ') !== -1) {
          return helpers
        }
        helpers[name] = makeMagicEventHelper(name)
        return helpers
      }, {})
      this.helpers(helpers)
    }.bind(TheTemplate))
  })
})
