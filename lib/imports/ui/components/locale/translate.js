// imports
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import Locale from '../../../api/locale'
import './translate.html'

// global helpers
Template.registerHelper('translate', function(key){
  // console.log('global helper translate key:', key)
  return Locale.translate(key);
})

// helpers
Template.translate.helpers({
  translation(key) {
    const instance = Template.instance()
    // console.log('helper translate key:', instance.data.key)
    return Locale.translate(instance.data.key)
  }
})
