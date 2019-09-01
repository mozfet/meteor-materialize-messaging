import messagesSchema from '../../api/schemas/messagesSchema.js'

import { Log } from 'meteor/mozfet:meteor-logs'

export const name = 'messages-collection'
Log.log(['debug', 'startup'], `${name}`)

Messages = new Mongo.Collection('messages')
Messages.attachSchema(messagesSchema())
export { Messages }
export default Messages
