// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by materialize-messaging.js.
import { name as packageName } from "meteor/materialize-messaging";

// Write your tests here!
// Here is an example.
Tinytest.add('materialize-messaging - example', function (test) {
  test.equal(packageName, "materialize-messaging");
});
