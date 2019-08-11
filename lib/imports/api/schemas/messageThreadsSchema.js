import SimpleSchema from 'simpl-schema'
import { Tracker } from 'meteor/tracker'
import Locale from '../locale'

const schema = () => {
  let isLoggedIn = false
  if(Meteor.isClient) {
    isLoggedIn = Meteor.userId()?true:false
  }

  return new SimpleSchema({
    _id: {
      type: String,
      optional: true,
      autoform: {
        omit: true
      }
    },
    isRead: {
      type: Boolean,
      optional: true,
      autoform: {
        omit: true
      }
    },    
    name: {
      type: String,
      label: () => Locale.translate('form-label-subject'),
      min: 1,
      max: 1000
    },
    userIds: {
      type: Array,
      optional: true,
      autoform: {
        omit: true
      }
    },
    'userIds.$': {
      type: String
    },
    createdAt: {
      type: Number,
      optional: true,
      autoform: {
        omit: true
      }
    },
    lastModified: {
      type: Number,
      optional: true,
      autoform: {
        omit: true
      }
    }
  }, { tracker: Tracker});
}

export default schema
