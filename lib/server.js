import Message from './imports/api/message'
import { Log } from 'meteor/mozfet:meteor-logs'
import './imports/startup/both'
import './imports/startup/server'

export const name = 'materialize-messaging-server'
Log.log(['debug', 'startup'], `${name}`)

export default Message
