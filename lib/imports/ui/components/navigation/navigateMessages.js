// imports
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { ReactiveVar } from 'meteor/reactive-var'
import { Log } from 'meteor/mozfet:meteor-logs'
import Locale from '../../../api/locale'
import '../locale'
import './navigateMessages.html'

export const name = 'navigateMessage'
Log.log(['debug', 'startup'], `${name}`)

// helpers
Template.messagingNavbarItem.helpers({
  unreadMessageCount() {
    return Session.get('tebUnreadMessageCount')
  },
  translate(key) {
    return Locale.translate(key)
  }
})

// events
Template.messagingNavbarItem.events({

  // on click of menu item
  'click .js-teb-navigate-messages-link'(event) {
    const instance = Template.instance()

    // close the sidenav
    const sidenavElement = $('#leftSideMenuSliding').get(0)
    if (sidenavElement) {
      const sidenav = M.Sidenav.getInstance(sidenavElement)
      sidenav.close()
    }
  }
})


Template.messagingNavbarItemCompact.helpers({
  unreadMessageCount() {
    return Session.get('tebUnreadMessageCount')
  }
})
