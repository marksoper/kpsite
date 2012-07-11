
define([
  "./auth",
  "./main",
  "./splash"
],
function(auth, main, splash) {
  return {
    Auth: auth,
    Main: main,
    Splash: splash
  };
});