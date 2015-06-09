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

  Template.parent.helpers({
    children () {
      return [1, 2]
    }
  })

  Template.parent.events({
    highlight (e, t) {
      $(e.target).toggleClass('highlight')
    }
  })

  // TODO this does not get matched yet because there is no `highlight` helper
  // being defined in the child class yet, propagating down from the parent
  // some messing around with data contexts would probably have to be done
  // in order to implement such a thing
  Template.child.events({
    highlight (e, t) {
      $(e.target).toggleClass('highlight')
    }
  })
}

// don't look, there's magic below!! ;-)

if (Meteor.isClient) {
  function magicEventHelper (handlerName) {
    return function () {
      let f = (function (handlerName) {
        // make event
        let e = window.event
        jQuery.event.fix(e)

        // search through view hierarchy for appropriate handler
        let view = Blaze.getView(this)
        do {
          let handler
          if (_.find(view.template.__eventMaps, map => handler = map[handlerName])) {
            return handler.call(view, e)
          }
        } while ((view = view.parentView))
        // no handler found, nothing to do
      })
      return '(' + f.toString() + ').bind(this)(\'' + handlerName + '\')'
    }
  }

  // find all defined templates
  let AllTemplates = _.values(Template).filter(t => t instanceof Blaze.Template && t.viewName.indexOf('Template._') === -1)
  // make helpers for all non-delegated/direct event handlers
  AllTemplates.forEach((TheTemplate) => {
    TheTemplate.__eventMaps.forEach(function (map) {
      let helpers = _.reduce(map, (ret, evtFn, name) => {
        if (name.indexOf(' ') !== -1) {
          return ret
        }
        ret[name] = magicEventHelper.call(this, name)
        return ret
      }, {})
      this.helpers(helpers)
    }.bind(TheTemplate))
  })
}
