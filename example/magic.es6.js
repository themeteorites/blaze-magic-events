if (Meteor.isClient) {
  Template.helloworld.events({
    sayHi (e, t) {
      console.log('event and templateInstance params, this binding', e, t, this)
      t.$('p').html('hi there from sayHi() handler!')
    },
    reset (e, t) {
      t.$('p').html('')
    },
    say (e, t, who, what) {
      t.$('p').html(`${who} says ${what}`)
    },
    incrName() {
      Session.set('id', Session.get('id') + 1)
    }
  })

  Session.setDefault('id', 0)
  Template.helloworld.helpers({
    name () {
      return 'template-' + Session.get('id')
    }
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
