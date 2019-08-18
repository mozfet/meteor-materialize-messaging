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
  }
]

export function setLanguage(lang) {
  language = lang
}

export function translate(key) {
  const entry = _.find(dictionary, entry => {
    return key === entry.key
  })

  return entry?entry[`lang_${language}`]:key
}
