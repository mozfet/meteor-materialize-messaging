import { check, Match } from 'meteor/check'
import Access from '/imports/api/access'

export function send(subject, body, recieverId, senderId = Meteor.userId()) {
  check(subject, String)
  check(body, String)
  check(recieverId, String)
  check(senderId, String)
  Messages.insert({
    senderId,
    recieverId,
    subject,
    body
  })
}

export function sendHtml
    (subject, bodyHtml, recieverId, senderId = Meteor.userId()) {
  check(subject, String)
  check(bodyHtml, String)
  check(recieverId, String)
  check(senderId, String)
  Messages.insert({
    senderId,
    recieverId,
    subject,
    bodyHtml
  })
}

export function groupSend
    (groupId, subject, body, senderId = Meteor.userId()) {
  check(groupId, String)
  check(subject, String)
  check(body, String)
  check(senderId, String)
  let userIds = GroupMembers.find({groupId}, {fields: {_id: 1}}).fetch()
  userIds = _.pluck(userIds, '_id')
  const threadId = MessageThreads.insert({name: subject, userIds})
  Messages.insert({
    threadId,
    senderId,
    subject,
    body
  })
}

/**
 * Requires subscription to 'messages.unread'
 * @param {}  -
 * @returns {}
 **/
export function unreadCount () {
  const userId = Meteor.userId()
  const threadIds = MessageThreads.find({userIds: userId},
      {fields: {_id: 1}}).fetch().map(thread => thread._id)
  const unreadCount = Messages.find({
    isReadByUsers: {$ne: userId},
    threadId: {$in: threadIds},
    senderId: {$ne: userId}
  }, {fields: {_id: 1}}).count()
  return unreadCount
}

/**
 *
 * @param {}  -
 * @returns {true} if user is a member of group
 **/


/**
 * Server side only. Get list of user labels for use in message view.
 * Excludes the user from the list becuase the user knows who they are.
 * @param {}  -
 * @returns {}
 **/
 export function threadUserLabels (threadId) {
   if (Meteor.isServer) {
     check(threadId, String)

     // get the user id
     const userId = Meteor.userId()

     // get the thread of which user is a member
     const thread = MessageThreads.findOne({_id: threadId, userIds: userId})

     // if thread exist
     if (thread) {

       // exclude this user and return usernames of each thread member
       return _.chain(thread.userIds)
          .reject(id => id === userId)
          .map(id => Access.userLabel(id))
          .value()
     }

     // else - thread does not exist
     else {

       // log and throw error
       Log.log(['error', 'message', 'api'], `Access violation, user ${userId} tried `+
          `to get user labels of thread ${threadId}`);
     }
   }
 }
