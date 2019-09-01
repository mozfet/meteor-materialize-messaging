import { Meteor } from 'meteor/meteor'

Meteor.methods({
  'User.idFromUsername'(username) {
    const user = Meteor.users.findOne({username})
    if (user) {
      return user._id
    }
    else {
      throw new Meteor.Error(`Unknown username ${username}`)
    }
  }
})
