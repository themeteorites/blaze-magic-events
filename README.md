# blaze-magic-events
A new way of binding event handlers to html elements for Meteor's Blaze.

note: all code is ES6

Template

```
<template name="helloworld">
  <button onclick={{sayHi}}>Say Hi!</button>
  <button onclick={{reset}}>reset</button>
  <button onclick={{say name "hi"}}>say "hi" (using args)</button>
  <p></p>
</template>
```

Event handlers

```
  Template.helloworld.events({
    sayHi (e, t) {
      console.log('event and templateInstance params', e, t)
      t.$('p').html('hi there from sayHi() handler!')
    },
    reset (e, t) {
      t.$('p').html('')
    },
    say (e, t, who, what) {
      t.$('p').html(`${who} says ${what}`)
    },
  })
  
  Template.helloworld.helpers({
    name () {
      return 'template'
    }
  })
```

Enjoy! Feedback welcome. Example app given.
