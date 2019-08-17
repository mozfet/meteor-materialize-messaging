import messagesSchema from '../../api/schemas/messagesSchema.js'
import messageThreadsSchema from '../../api/schemas/messageThreadsSchema.js'

//define collections
Messages = new Mongo.Collection('messages')
MessageThreads = new Mongo.Collection('messageThreads')

//attach schemas
Messages.attachSchema(messagesSchema())
MessageThreads.attachSchema(messageThreadsSchema())
