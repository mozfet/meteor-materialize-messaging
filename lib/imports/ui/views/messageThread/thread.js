// imports
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import moment from 'moment'
import Locale from '../../../api/locale'
import './message'
import './thread.html'

// on created
Template.Thread.onCreated(() => {
  const instance = Template.instance()
  const threadId = FlowRouter.getParam('threadId')
  instance.subscribe('messages.thread', threadId, () => {
    instance.autorun(() => {
      const thread = MessageThreads.findOne(threadId)
      Session.set('breadcrumbs', [
        {
          href: FlowRouter.path('/messages'),
          label: Locale.translate('messaging-breadcrumb'),
          // icon: 'email'
        },
        {
          href: FlowRouter.path('/messages/:threadId', {threadId: thread._id}),
          label: thread.name
        }
      ])
    })
  })
  instance.subscribe('messages', threadId)
  instance.state = {threadId}
})

// on rendered
Template.Thread.onRendered(() => {
  const instance = Template.instance()
})

// helpers
Template.Thread.helpers({
  thread() {
    const instance = Template.instance()
    return MessageThreads.findOne(instance.state.threadId)
  },
  messages() {
    const instance = Template.instance();
    return Messages.find({threadId: instance.state.threadId}, {sort: {createdAt: -1}})
  }
})

function sendMessage () {
  const instance = Template.instance()
  const qInput = instance.$('#teb-message-input')
  const messageBody = qInput.val()
  qInput.val('')
  Log.log(['debug', 'message'], 'Message body', messageBody);
  const thread = MessageThreads.findOne(instance.state.threadId)
  const doc = {
    threadId: instance.state.threadId,
    subject: thread.name,
    body: messageBody
  }
  Log.log(['debug', 'message'], 'Sending message ', doc);
  const messageId = Messages.insert(doc)
  Log.log(['debug', 'message'], 'Sent message ', messageId);
}

// events
Template.Thread.events({

  // on click class
  'click .js-teb-messaging-send'(event, instance) {
    Log.log(['debug', 'message'], 'Send button was clicked.');
    sendMessage()
  },

  // on enter button pressed
  'keypress': function (evt, template) {
    if (evt.which === 13) {
      Log.log(['debug', 'message'], 'Enter button on keyboard was pressed.');
      sendMessage()
    }
  }

})

// on destroyed
Template.Thread.onDestroyed(() => {
  Session.set('breadcrumbs', [])
})
