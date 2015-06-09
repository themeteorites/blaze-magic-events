# blaze-magic-events
A new way of binding event handlers to html elements for Meteor's Blaze.

note: all code is ES6

Template

```
<template name="helloworld">
  <button onclick={{sayHi}}>Say Hi!</button>
  <button onclick={{reset}}>reset</button>
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
  })
```

Enjoy! Feedback welcome. Example app given. Magic sauce is hardcoded to "helloworld" template. It is left as an exercise to the reader (or user) to adjust that part of the code.
