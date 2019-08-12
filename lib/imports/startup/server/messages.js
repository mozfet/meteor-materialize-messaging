import { check, Match } from 'meteor/check'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Jobs } from 'meteor/msavin:sjobs'
import moment from 'moment'
import Access from 'meteor/mozfet:access'

/**
 * Publish message of a thread
 **/
Meteor.publish('messages', function(threadId) {
  check(threadId, String)
  const messageThread = MessageThreads.findOne(threadId)
  if (_.contains(messageThread.userIds), this.userId) {
    const messages = Messages.find({threadId})
    // Log.log(['debug', 'message', 'publish'], `Publishing ${messages.count()} `+
    //     `messages of thread ${threadId} to user ${this.userId}.`)
    return messages
  }
  else {
    Log.log(['error', 'message', 'publish'],
        'User does not have access to this thread.')
  }
})

/**
 * Publish unread messages for this user.
 **/
Meteor.publish('messages.unread', function() {

  // get all threads involving this user
  const threadIds = MessageThreads.find({userIds: this.userId},
      {fields: {_id: 1}}).fetch().map((thread)=>{return thread._id})

  // find unread messages for threads
  const messages = Messages.find({
    threadId: {$in: threadIds},
    isReadByUsers: {$ne: this.userId},
    senderId: {$ne: this.userId}
  })
  // Log.log(['debug', 'message', 'publish'], `Publishing ${messages.count()}`+
  //      ` unread messages to user ${this.userId}.`)
  // return unread messages
  return messages
})

/**
 * Before insert hook for Message collection.
 */
Messages.before.insert(function (userId, doc) {
  Log.log(['debug', 'message', 'hook'], 'before insert message', doc);

  // set sender
  if (userId) {
    doc.senderId = userId
    doc.senderName = Access.userLabel(userId)
  }

  // if there is no thread yet
  if (!doc.threadId) {

    // if no reciever
    if (!doc.recieverId) {

      // set reciever to admin
      doc.recieverId = Accounts.findUserByEmail('info@expertbox.com')._id
    }

    // set reciever name
    doc.recieverName = Access.userLabel(doc.recieverId)

    // start a thread inlcuding sender and reciever
    const threadId = MessageThreads.insert({name: doc.subject, userIds: [
      doc.senderId, doc.recieverId ]})
    doc.threadId = threadId
  }

  // set dates
  doc.createdAt = doc.lastModified = Date.now()
})

/**
 * After insert hook for Message collection
 */
Messages.after.insert(function (userId, doc) {
  Log.log(['debug', 'message', 'hook'],
      'Schedule job for message waiting reminder email notification');

  // schedule a reminder email
  Jobs.run('sendMessageWaitingNotification', doc._id, {
    in: {minutes: 15}, priority: 1000
  })

  // if there is an existing thread
  if (doc.threadId) {

    // update the message thread lastModified
    MessageThreads.update(doc.threadId, {$set: {lastModified: Date.now()}})
  }
})

/**
 * Before update hook for Message collection.
 */
Messages.before.update(function (userId, doc, fieldNames, modifier, options) {

  // ensure the set modifier is defined
  modifier.$set = modifier.$set || {}

  // set dates on the modifier
  modifier.$set.lastModified = Date.now()
})

/**
 * Client side access rules for collection Messages.
 **/
Messages.allow({

  /**
   * Anyone may insert a message.
   **/
  insert(userId, doc) {
    return true
  },

  /**
   * @TODO Thread members can add themselves to the isReadByUsers array
   **/
  update(userId, doc, fieldNames, modifier) {
    Log.log(['debug', 'message', 'allow'], 'allow update fieldnames', fieldNames);
    Log.log(['debug', 'message', 'allow'], 'allow update modifier', modifier);

    // if user is member of thread
    const thread = MessageThreads.findOne(doc.threadId)
    Log.log(['debug', 'message', 'allow'], 'allow update thread', thread);

    // test modifier for allowed updates
    const isValidFieldNames = (fieldNames.length === 1) &&
        _.contains(fieldNames, 'isReadByUsers')
    Log.log(['debug', 'message', 'allow'], 'allow update isValidFieldNames',
        isValidFieldNames)
    const modifierPush = (_.keys(modifier).length === 1) &&
        _.has(modifier, '$push')?modifier['$push']:false
    Log.log(['debug', 'message', 'allow'], 'allow update modifierPush', modifierPush)
    const isReadByUsers = modifierPush && _.has(modifierPush, 'isReadByUsers')?
        modifierPush['isReadByUsers']:false
    Log.log(['debug', 'message', 'allow'], 'allow update isReadByUsers', isReadByUsers)
    const isValidUser = thread && _.contains(thread.userIds, userId)
    Log.log(['debug', 'message', 'allow'], 'allow update isValidUser', isValidUser)
    const isValidUpdate = isValidFieldNames && isReadByUsers && isValidUser &&
      modifierPush['isReadByUsers'] === userId
    Log.log(['debug', 'message', 'allow'], 'allow update isValidUpdate', isValidUpdate)

    /* valid update */
    if (isValidUpdate) {

      // return true
      Log.log(['debug', 'message', 'hook'], 'allow update is true')
      return true
    }

    // return false
    Log.log(['debug', 'message', 'hook'], 'allow update is false')
    return false
  },

  /**
   * @TODO Sender may remove.
   **/
  remove(userId, doc) {
    return false
  }
})

/**
 * Job that runs after a message is sent to notify users of waiting messages via
 * email. Check for unread messages and notify thread members.
 **/
Jobs.register({
  'sendMessageWaitingNotification': function(messageId) {
    Log.log(['debug', 'message', 'job'],
      'Start sendMessageWaitingNotification job')

    // fetch the message
    const message = Messages.findOne(messageId,
        {fields: {_id: 1, threadId: 1, isReadByUsers: 1, senderId: 1}})

    // fetch the message thread
    const thread = MessageThreads.findOne(message.threadId,
          {fields: {userIds: 1}})
    Log.log(['debug', 'message', 'job'],
        `Message ${message._id} belongs to thread ${thread._id}`)

    // create thread url
    const threadUrl = Meteor.settings.host.rootUrl+'/messages/'+
        message.threadId;
    Log.log(['debug', 'message', 'job'], 'Message thread url:', threadUrl)

    // filter thread users that have not read the message
    const unreadUsers = _.chain(thread.userIds).filter(userId => {
      return (message.senderId!=userId) &&
          !_.contains(message.isReadByUser, userId)
    }).reject(userId => userId === message.senderId).value()
    Log.log(['debug', 'message', 'job'],
        'Thread users that have not read this message:', unreadUsers)

    // for each unread user
    for (let userId of unreadUsers) {

      /* send notification email unred user */
      const user = Meteor.users.findOne(userId)
      if (user) {
        const email = user.emails[0].address
        if (email) {
          Email.send({
            from: 'info@expertbox.com',
            to: email,
            subject: 'Message Notification',
            messageId: thread._id,
            text: `You have a new message waiting to be read at ${threadUrl}`,
            html: `<p>You have a <a href="${threadUrl}">new message</a> waiting `+
                `to be read.</p>`
          })
        }
      }
    }

    // mark job as done with message id as result
    this.success(message._id)
  }
})
