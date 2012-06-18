
define([
],
function() {
  var Auth = {};
  Auth.initFBAuth = function() {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '378081648918321', // App ID
        channelUrl : '//kp.marksoper.net/channel.html', // Channel File
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
      });
      // Additional initialization code here
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
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
          console.log('Good to see you, ' + response.name + '.');
          console.log("---FB.login response: " + JSON.stringify(response));
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  };
  return Auth;
});