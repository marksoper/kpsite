
define([
  "app",
  "settings"
],

function(app, settings) {
  var logger = app.logging.getLogger("auth.js");
  var Auth = {};
  Auth.initFBAuth = function() {
    window.fbAsyncInit = function() {
      FB.init(settings.facebook);
      // listen for and handle auth.statusChange events
      FB.Event.subscribe('auth.statusChange', function(response) {
        if (response.authResponse) {
          // user has auth'd your app and is logged into Facebook
          FB.api('/me', function(me){
            if (me.name) {
              logger.info("---loginFB success: " + JSON.stringify(me));
              app.trigger("authenticated", me);
            }
          });
        } else {
          // user has not auth'd your app, or is not logged into Facebook
          app.trigger("notAuthenticated");
        }
      });
    };
  };
  Auth.loadFBSDK = function() {
    // Load the SDK Asynchronously
    (function(d){
       var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement('script'); js.id = id; js.async = true;
       js.src = "//connect.facebook.net/en_US/all.js";
       ref.parentNode.insertBefore(js, ref);
     }(document));
  };
  Auth.loginFB = function() {
    FB.login(function(response) {
      if (response.authResponse) {
        logger.info('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
          logger.info('Good to see you, ' + response.name + '.');
          logger.info("---FB.login response: " + JSON.stringify(response));
        });
      } else {
        logger.info('User cancelled login or did not fully authorize.');
      }
    });
  };
  return Auth;
});