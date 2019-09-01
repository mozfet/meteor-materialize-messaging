import Message from '../../api/message'

Meteor.methods({
  'message.thread.userLabels': Message.threadUserLabels,
})
