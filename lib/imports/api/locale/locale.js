import { _ } from 'meteor/underscore'

const dictionary = [
  {
    key: 'form-label-subject',
    lang_EN: 'Subject'
  },
  {
    key: 'form-label-sender-email',
    lang_EN: 'Email'
  },
  {
    key: 'form-label-body',
    lang_EN: 'Body'
  },
  {
    key: 'navigation-messages',
    lang_EN: 'Messages'
  },
  {
    key: 'messaging-breadcrumb',
    lang_EN: 'Messages'
  },
  {
    key: 'messaging-view-title',
    lang_EN: 'Messages'
  },
  {
    key: 'messaging-view-body',
    lang_EN: 'Here you can read and respond to all your messages in discussion threads.'
  },
  {
    key: 'messaging-subject-tooltip',
    lang_EN: 'Subject'
  },
  {
    key: 'messaging-thread-users',
    lang_EN: 'Users'
  },
  {
    key: 'message-thread-missing-title',
    lang_EN: 'There is no message thread title.'
  },
  {
    key: 'message-thread-missing-body',
    lang_EN: 'There is no message thread body.'
  },
  {
    key: 'messaging-view-contact-button',
    lang_EN: 'Message customer support'
  }
]

let language = "EN"
export function setLanguage(_language) {
  language = _language
  console.log('language changed: ', language)
}

export function translate(key) {
  // console.log('translate key: ', key)
  const entry = _.find(dictionary, entry => {
    return key === entry.key
  })
  // console.log('translate entry: ', entry)
  const languageKey = `lang_${language}`
  const result = entry?entry[languageKey]:key
  console.log('translate value: ', result)
  return result
}
