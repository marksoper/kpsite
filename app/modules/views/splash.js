
define([
  "app",
  "backbone"
],
function(app, Backbone) {
  var Splash = Backbone.View.extend({
    template: "splash"
  });
  return Splash;
});