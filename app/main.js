
//
// TODO: global reference for dev purposes -- remove this
//
var kp;

require([
  // Global
  "app",
  // Libs
  "jquery",
  "backbone",
  // Modules
  "auth",
  "views/index",
  "models/index",
  "lib/logging"
],

function(app, $, Backbone, Auth, Views, Models, logging) {

  var logger = logging.getLogger("main.js");

  // init FB Auth
  Auth.initFBAuth();
  Auth.loadFBSDK();

  // app events
  app.on("authenticated", function(fbuser) {
    var user = new Models.User();
    user.loadFBUser(fbuser);
    app.user = user;
    var mainView = new Views.Main();
    $("#container").html(mainView.render().el);
  });
  app.on("notAuthenticated", function() {
    var authView = new Views.Auth();
    $("#container").html(authView.render().el);
  });

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },
    index: function() {
      logger.info("inside index route");
      var splashView = new Views.Splash();
      $("#container").html(splashView.render().el);
    }
  });

  // Treat the jQuery ready function as the entry point to the application.
  // Inside this function, kick-off all initialization, everything up to this
  // point should be definitions.
  $(function() {
    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
    app.router = new Router();

    // Trigger the initial route and enable HTML5 History API support
    Backbone.history.start({ pushState: true });
  });

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router. If the link has a `data-bypass`
  // attribute, bypass the delegation completely.
  $(document).on("click", "a:not([data-bypass])", function(evt) {
    // Get the anchor href and protcol
    var href = $(this).attr("href");
    var protocol = this.protocol + "//";

    // Ensure the protocol is not part of URL, meaning it's relative.
    if (href && href.slice(0, protocol.length) !== protocol &&
        href.indexOf("javascript:") !== 0) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events. The Router's internal `navigate` method
      // calls this anyways.
      Backbone.history.navigate(href, true);
    }
  });

});
