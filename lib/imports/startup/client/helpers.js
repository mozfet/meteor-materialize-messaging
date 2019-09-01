import Locale from '../../api/locale'
import moment from 'moment'
import { Session } from 'meteor/session'
import { _ } from 'meteor/underscore'

if (Meteor.isClient){

	//global utility helpers - Because DRY...
	//used to avoid writing helpers for template scope accessors
	//use in markup: <div style="background: {{instance.currentColor.get}}"></div>
	//see https://dweldon.silvrback.com/template-instance
	Template.registerHelper('instance', function() {
	  return Template.instance()
	})

	Template.registerHelper('session', function() {
		return Session
	})

	Template.registerHelper('equals', function(v1, v2) {
	  return v1 === v2
	})

	Template.registerHelper('or', function(v1, v2) {
	  return v1||v2
	})

	Template.registerHelper('and', function(v1, v2) {
	  return v1&&v2
	})

	Template.registerHelper('not', function(bool) {
		return !bool
	})

	Template.registerHelper('count', function(array) {
		return _.size(array)
	})

	Template.registerHelper('append', function(t1, t2) {
	  return t1 + t2
	})

	Template.registerHelper('isAdmin', function() {
    return Roles.userIsInRole(Meteor.userId(), ['admin'])
  })

	Template.registerHelper('isConnected', function() {
    return Meteor.status().connected
  })

	Template.registerHelper('formatDate', function(date) {
    return moment(date).format('D MMM YYYY')
  })

	Template.registerHelper('formatTime', function(date) {
    return moment(date).format('HH:mm Z')
  })

	Template.registerHelper('formatDateSlug', function(date) {
    return moment(date).format('YYYY-MM-DD')
  })

	Template.registerHelper('duration', function(amount, unit) {
    return moment.duration(amount, unit).humanize()
  })

	//template debug tool
	Template.registerHelper('jsonLog', function(string, object) {
    var result = JSON.stringify(object, null, 2)
    console.log(string, result)
    return undefined
	})

	//template debug tool
	Template.registerHelper('log', function(string) {
    console.log(string)
    return undefined
	})

	Template.registerHelper('screenSize', function() {
		return Session.get('screenSize')
	})

	Template.registerHelper('isLoaded', function() {
		return Loader.isLoaded.get()
	})

	Template.registerHelper('isPrimaryLoaded', function() {
		return Loader.isPrimaryLoaded.get()
	})

	Template.registerHelper('isSecondaryLoaded', function() {
		return Loader.isSecondaryLoaded.get()
	})

	Template.registerHelper('isProduction', function() {
		return Meteor.isProduction
	})

	Template.registerHelper('isDevelopment', function() {
		return Meteor.isDevelopment
	})
}
