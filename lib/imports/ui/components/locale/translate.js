// imports
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import Locale from '../../../api/locale'
import './translate.html'

// helpers
Template.translate.helpers({
  translation(key) {
    return Locale.translate(key)
  }
})
