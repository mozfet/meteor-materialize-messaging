# meteor-materialize-messaging

## Dependancies

## Installation

```cli
meteor add mozfet:meteor-materialize-messaging
```

```js
import 'meteor/mozfet:materialize-messaging'
```

## Usage

### Navigation

```html

```

#### FlowRouter

```js
import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'
import 'meteor/mozfet:materialize-messaging'
import '/imports/ui/layouts/body/body.js'

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'Messaging' })
  },
})
```

#### Parrot
