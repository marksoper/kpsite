
define([
  "app",
  "backbone",
  "auth"
],
function(app, Backbone, authModule) {
  var Auth = Backbone.View.extend({
    template: "auth",
    events: {
      "click div#login": "login"
    },
    login: function() {
      authModule.loginFB();
    }
  });
  return Auth;
});