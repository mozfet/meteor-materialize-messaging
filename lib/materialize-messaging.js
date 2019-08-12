import Message form '/imports/api/message'

export const name = 'materialize-messaging'

export default Message

if (Meteor.isServer) {
  Meteor.startup(async () => {
    await import("/imports/startup/both")
    await import("/imports/startup/server")
  })
}

if (Meteor.isClient) {
  Meteor.startup(async () => {
    await import("/imports/startup/both")
    await import("/imports/ui/components/navigation")
    await import("/imports/ui/components/message")
    await import("/imports/ui/components/thread")
    await import("/imports/ui/")
  })
}
