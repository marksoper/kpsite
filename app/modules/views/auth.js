
define([
  "app",
  "backbone"
],

function(app, Backbone) {
  
  var Auth = Backbone.View.extend({
    template: "auth"
  });

  app.Views = app.Views || {};
  app.Views.Auth = Auth;

  return Auth;

});