
define([
  "app",
  "backbone"
],

function(app, Backbone) {

  var logger = app.logging.getLogger("/models/user.js");

  var User = Backbone.Model.extend({
    loadFBUser: function(fbuser) {
      this.set({
        fbid: fbuser.id,
        name: {
          full: fbuser.name,
          first: fbuser.first_name,
          last: fbuser.last_name
        }
      });
      logger.info("loadFBUser for user: " + fbuser);
      return this;
    }
  });

  app.Models = app.Models || {};
  app.Models.User = User;

  return User;

});