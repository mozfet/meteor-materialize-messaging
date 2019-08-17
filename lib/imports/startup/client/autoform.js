import SimpleSchema from 'simpl-schema'
import { AutoForm } from 'meteor/aldeed:autoform'
AutoForm.setDefaultTemplate('materialize')
SimpleSchema.extendOptions(['autoform'])
