define([
  // Libs
  "jquery",
  "lodash",
  "backbone",
  "lib/logging"
],

function($, _, Backbone, logging) {

  var logger = logging.getLogger("app.js");

  var templatePath = "app/templates/";

  // Localize or create a new JavaScript Template object.
  var JST = window.JST = window.JST || {};

  // Keep active application instances namespaced under an app object.
  var app = _.extend({

    // This is useful when developing if you don't want to use a
    // build process every time you change a template.
    //
    // Delete if you are using a different template loading method.
    fetchTemplate: function(path) {
      // Append the file extension.
      path = templatePath + path + ".html";

      // Should be an instant synchronous way of getting the template, if it
      // exists in the JST object.
      if (!JST[path]) {
        // Fetch it asynchronously if not available from JST, ensure that
        // template requests are never cached and prevent global ajax event
        // handlers from firing.
        $.ajax({
          url: "/" + path,
          dataType: "text",
          cache: false,
          async: false,

          success: function(contents) {
            JST[path] = _.template(contents);
          }
        });
      }

      // Ensure a normalized return value.
      return JST[path];
    }

  // Mix Backbone.Events into the app object.
  }, Backbone.Events);

  Backbone.View.prototype.render = function(context) {
    var html = app.fetchTemplate(this.template)(context);
    this.$el.html(html);
    return this;
  };

  //
  // logging
  //
  app.logging = logging;

  //
  // TODO: global reference for dev purposes -- remove this
  //
  window.kp = app;
  kp = app;

  return app;

});
