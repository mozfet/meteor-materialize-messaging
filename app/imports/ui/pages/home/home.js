import { Meteor } from 'meteor/meteor'
import Message from 'meteor/mozfet:materialize-messaging'
import './home.html'

Template.Home.onCreated(() => {
  const instance = Template.instance()
  instance.state = {
    subject: new ReactiveVar('Hello World'),
    body: new ReactiveVar('Lorum ipsum...'),
    recieverId: new ReactiveVar()
  }

  instance.autorun(() => {
    const userId = Meteor.userId()
    if (userId) {
      const user = Meteor.users.find({_id: userId}).fetch()
      if (user) {
        const username = user.username === 'test1'?'test2':'test1'
        Meteor.call('User.idFromUsername', username, (error, result) => {
          console.log('Reciever ID:', error, result)
          if (error) {
            throw new Meteor.Error(error)
          }
          else {
            instance.state.recieverId.set(result)
          }
        })

      }
      else {
        // console.error('')
        throw new Meteor.Error(`Cannot find user ${userId}`)
      }
    }
  })
})

Template.Home.helpers({
  isEqual(arg1, arg2) {
    return arg1 === arg2
  }
})

Template.Home.events({
  'click .js-message-send': async (event) => {
    const instance = Template.instance()
    const subject = instance.state.subject.get()
    const body = instance.state.body.get()
    const recieverId = instance.state.recieverId.get()
    console.log('Send:', subject, body, recieverId)
    Message.send(subject, body, recieverId)
  }
})
