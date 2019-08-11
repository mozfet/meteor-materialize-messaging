import {send} from './message'
import {sendHtml} from './message'
import {groupSend} from './message'
import {countUnreadMessages} from './message'
import {threadUserLabels} from './message'

export default {
  send,
  sendHtml,
  groupSend,
  unreadCount: countUnreadMessages,
  threadUserLabels
}
