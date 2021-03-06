import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'
import '../../ui/layouts/body/body.js'
import '../../ui/pages/home/home.js'
import '../../ui/pages/not-found/not-found.js'

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'Root',
  action() {
    BlazeLayout.render('App_body', { main: 'Home' })
  },
})

FlowRouter.route('/home', {
  name: 'Home',
  action() {
    BlazeLayout.render('App_body', { main: 'Home' })
  },
})

FlowRouter.route('/messages', {
  name: 'MessageThread',
  action() {
    BlazeLayout.render('App_body', { main: 'MessagingView' })
  }
})

FlowRouter.route('/messages/:threadId', {
  name: 'MessageThread',
  action() {
    BlazeLayout.render('App_body', { main: 'MessageThread' })
  }
})

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' })
  }
}
