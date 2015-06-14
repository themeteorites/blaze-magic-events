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
