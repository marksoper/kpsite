
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
      // listen for and handle auth.statusChange events
      FB.Event.subscribe('auth.statusChange', function(response) {
        if (response.authResponse) {
          // user has auth'd your app and is logged into Facebook
          FB.api('/me', function(me){
            if (me.name) {
              console.log("---loginFB success: " + JSON.stringify(me));
              //document.getElementById('auth-displayname').innerHTML = me.name;
            }
          });
          //document.getElementById('auth-loggedout').style.display = 'none';
          //document.getElementById('auth-loggedin').style.display = 'block';
        } else {
          // user has not auth'd your app, or is not logged into Facebook
          //document.getElementById('auth-loggedout').style.display = 'block';
          //document.getElementById('auth-loggedin').style.display = 'none';
        }
      });
      // respond to clicks on the login and logout links
      document.getElementById('login').addEventListener('click', function(){
        Auth.loginFB();
      });
      //document.getElementById('auth-logoutlink').addEventListener('click', function(){
      //  FB.logout();
      //});
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