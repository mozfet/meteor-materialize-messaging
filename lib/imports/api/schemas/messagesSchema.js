import SimpleSchema from 'simpl-schema'
import { Tracker } from 'meteor/tracker'
import Locale from '../../api/locale'

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
    threadId: {
      type: String,
      optional: true,
      autoform: {
        omit: true
      }
    },
    senderId: {
      type: String,
      optional: true,
      autoform: {
        omit: true
      }
    },
    senderName: {
      type: String,
      optional: true,
      autoform: {
        omit: isLoggedIn
      }
    },
    recieverId: {
      type: String,
      optional: true,
      autoform: {
        omit: true
      }
    },
    recieverName: {
      type: String,
      optional: true,
      autoform: {
        omit: true
      }
    },
    senderEmail: {
      type: String,
      label: () => Locale.translate('form-label-sender-email'),
      optional: true,
      autoform: {
        type: 'email',
        omit: isLoggedIn
      }
    },
    isReadByUsers: {
      type: Array,
      optional: true,
      autoform: {
        omit: true
      }
    },
    'isReadByUsers.$': {
      type: String
    },
    subject: {
      type: String,
      label: () => Locale.translate('form-label-subject'),
      min: 1,
      max: 1000
    },
    body: {
      type: String,
      label: () => Locale.translate('form-label-body'),
      min: 1,
      max: 10000,
      optional: true,
      // custom: function () {
      //   // required if bodyHtml value is empty
      //   const isBodyHtmlDefined = this.field('bodyHtml').value !== undefined
      //   console.log('isBodyHtmlDefined', isBodyHtmlDefined)
      //   const isThisValueUndefined = this.value === undefined
      //   console.log('isThisValueUndefined', isThisValueUndefined)
      //   return isBodyHtmlDefined && isThisValueUndefined?undefined:
      //       SimpleSchema.ErrorTypes.REQUIRED
      // },
      autoform: {
        type: 'textarea'
      }
    },
    bodyHtml: {
      type: String,
      optional: true,
      autoform: {
        omit: true
      }
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
