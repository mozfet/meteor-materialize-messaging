// imports
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import { ReactiveDict } from 'meteor/reactive-dict'
import Locale from '../../../api/locale'
import '../../components/DynaText'
import './messaging.html'

async function updateUnread (instance) {
  const threads = MessageThreads.find({}).fetch()
  const userId = Meteor.userId()
  for (let thread of threads) {
    thread.unreadCount = Messages.find({
      isReadByUsers: {$ne: userId},
      threadId: thread._id,
      senderId: {$ne: userId}
    }).count()
    const oldThread = instance.state.threads.get(thread._id)
    if ((oldThread === undefined) ||
        (oldThread.unreadCount !== thread.unreadCount)) {
      const promise = new Promise((resolve, reject) => {
        Meteor.call('message.thread.userLabels', thread._id, (error, result) => {
          Log.log(['debug', 'message'], 'userLabels method returned', {error, result});
          if (error) {
            reject(error)
          }
          else {
            resolve(result)
          }
        })
      })
      thread.userLabels = await promise
      instance.state.threads.set(thread._id, thread)
    }
  }
}

// on created
Template.tebViewMessaging.onCreated(() => {
  const instance = Template.instance()
  instance.state = {
    threads: new ReactiveDict()
  }
  instance.state.threadSubscription = instance.subscribe('messages.threads',
      () => updateUnread(instance))
  instance.subscribe('messages.unread')
  instance.state.interval = Meteor.setInterval(() => {
    instance.subscribe('messages.unread', () => updateUnread(instance))
    updateUnread(instance)
  }, 500)
  Session.set('breadcrumbs', [{
    href: FlowRouter.path('/messages'),
    label: Locale.translate('messaging-breadcrumb'),
    // icon: 'email'
  }])
})

// helpers
Template.tebViewMessaging.helpers({
  threads() {
    const instance = Template.instance()
    const threads = MessageThreads.find({userIds: Meteor.userId()},
        {sort: {lastModified: -1}})
    return threads
  },
  unreadCount(threadId) {
    const instance = Template.instance()
    const thread = instance.state.threads.get(threadId)
    return thread?thread.unreadCount:0
  },
  userLabels(threadId) {
    const instance = Template.instance()
    const thread = instance.state.threads.get(threadId)
    return thread?thread.userLabels.join(', '):''
  }
})

// on destroyed
Template.tebViewMessaging.onDestroyed(() => {
  const instance = Template.instance()
  Meteor.clearInterval(instance.state.interval)
  Session.set('breadcrumbs', [])
})
