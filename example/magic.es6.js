if (Meteor.isClient) {
  Template.helloworld.events({
    sayHi (e, t) {
      console.log('event and templateInstance params', e, t)
      t.$('p').html('hi there from sayHi() handler!')
    },
    reset (e, t) {
      t.$('p').html('')
    },
  })
}

// don't look, there's magic below!! ;-)

if (Meteor.isClient) {
  function magicEventHelper (handlerName) {
    let templateName = this.viewName
    return function () {
      let f = (function (handlerName, templateName) {
        let e = window.event
        jQuery.event.fix(e)

        e.preventDefault()

        let view = Blaze.getView(this)

        // resolve global var name in templateName; could have just used eval(templateName)
        let template = _.reduce(templateName.split('.'), (ret, part) => {
          return ret && ret[part]
        }, window)
        while (view.template !== template) {
          view = view.parentView
          if (!view) {
            console.log('no active view found for', template)
            return
          }
        }

        let handler
        _.find(view.template.__eventMaps, map => handler = map[handlerName])
        if (!handler) {
          return
        }
        return handler.call(view, e)
      })
      return '(' + f.toString() + ').bind(this)(\'' + handlerName + '\', \'' + templateName + '\')'
    }
  }

  // make helpers for all non-delegated/direct event handlers
  Template.helloworld.__eventMaps.forEach(function (map) {
    var helpers = _.reduce(map, (ret, evtFn, name) => {
      if (name.indexOf(' ') !== -1) {
        return ret
      }
      ret[name] = magicEventHelper.call(this, name)
      return ret
    }, {})
    this.helpers(helpers)
  }.bind(Template.helloworld))
}
