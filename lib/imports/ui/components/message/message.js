import moment from 'moment'
import './message.html'

Template.tebViewThreadMessage.onRendered(() => {
  const instance = Template.instance()

  // if message is not sent by user and message has been read by user
  const userId = Meteor.userId()
  const isSender = (instance.data.message.senderId === undefined)
      || (instance.data.message.senderId === userId)
  if (!isSender && !_.contains(instance.data.message.isReadByUsers, userId)) {
    Log.log(['debug', 'message'],
        `Marking message ${instance.data.message._id} as read.`);

    // update messages to mark them as read
    Messages.update(instance.data.message._id,
        {$push: {isReadByUsers: userId}})
  }
})

Template.tebViewThreadMessage.helpers({
  isRead() {
    const instance = Template.instance()
    const userId = Meteor.userId()
    if (instance.data.message.senderId === userId) {
      return true
    }
    else {
      return _.contains(instance.data.message.isReadByUsers, userId)
    }
  },
  dateTime(date) {
    return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')
  }
})
