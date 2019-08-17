// imports
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { ReactiveVar } from 'meteor/reactive-var'

import './navigateMessages.html'

// helpers
Template.messagingNavbarItem.helpers({
  unreadMessageCount() {
    return Session.get('tebUnreadMessageCount')
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
