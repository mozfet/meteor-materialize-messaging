import messageThreadsSchema from '../schemas/messageThreadsSchema.js'
MessageThreads = new Mongo.Collection('messageThreads')
MessageThreads.attachSchema(messageThreadsSchema())
export default MessageThreads
