function makeMagicEventHelper (handlerName) {
  return function magicEventHelper () {
    return 'return __magicEvent.call(this, typeof arguments !== \'undefined\' ? arguments : null, \'' + handlerName + '\')'
  }
}

__magicEvent = function (args, handlerName) {
  // make event
  let e = args && args[0] || window.event
  jQuery.event.fix(e)

  // search through view hierarchy for appropriate handler
  let view = Blaze.getView(this)
  do {
    let handler
    if (view.template && _.find(view.template.__eventMaps, map => handler = map[handlerName])) {
      return handler.call(view, e)
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
      let helpers = _.reduce(map, (ret, evtFn, name) => {
        if (name.indexOf(' ') !== -1) {
          return ret
        }
        ret[name] = makeMagicEventHelper(name)
        return ret
      }, {})
      this.helpers(helpers)
    }.bind(TheTemplate))
  })
})
