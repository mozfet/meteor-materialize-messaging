import Message from './imports/api/message'
import { Log } from 'meteor/mozfet:meteor-logs'
import './imports/startup/both'
import './imports/startup/client'

export const name = 'materialize-messaging-client'
Log.log(['debug', 'startup'], `${name}`)

export default Message
