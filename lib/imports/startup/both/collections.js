import messagesSchema from '/imports/api/schemas/messagesSchema'
import messageThreadsSchema from '/imports/api/schemas/messageThreadsSchema'

//define collections
Messages = new Mongo.Collection('messages')
MessageThreads = new Mongo.Collection('messageThreads')

//attach schemas
Messages.attachSchema(messagesSchema())
MessageThreads.attachSchema(messageThreadsSchema())
