import { check, Match } from 'meteor/check'
import { Access } from 'meteor/mozfet:access'
export const name = 'server-startup-threads'
Log.log(['debug', 'startup'], `${name}`)

/**
 * Publish all message threads of the user
 **/
Meteor.publish('messages.threads', function() {
  const threads = MessageThreads.find({userIds: this.userId})
  console.log('public messages.threads userId:', this.userId)
  console.log('public messages.threads threads:', threads.fetch())
  // Log.log(['debug', 'message', 'publish'],
  //   `Publishing ${threads.count()} message threads to user ${this.userId}.`);
  return threads
})

/**
 * Publish a single thread
 **/
Meteor.publish('messages.thread', function(threadId) {
  check(threadId, String)
  const threads = MessageThreads.find({userIds: this.userId, _id: threadId})
  console.log('public messages.thread threads:', threads.fetch())
  const count = threads.count();
  if (count>0) {
    Log.log(['debug', 'message', 'publish'],
        `Publishing message thread ${threadId} to user ${this.userId}.`);
    return threads
  }
  else {
    Log.log(['error', 'message', 'publish'],
        `User ${this.userId} does not have access to thread ${threadId}.`);
  }
})

/**
 * Before insert hook for MessageThreads collection.
 */
MessageThreads.before.insert(function (userId, doc) {
  Log.log(['debug', 'message', 'hook'], 'before insert message thread', doc);

  // set dates
  doc.createdAt = doc.lastModified = Date.now()
})
