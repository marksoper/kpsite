// Set the require.js configuration for your application.
require.config({
  // Initialize the application with the main application file
  deps: ["main"],

  paths: {
    // JavaScript folders
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",

    // Libraries
    jquery: "../assets/js/libs/jquery",
    lodash: "../assets/js/libs/lodash",
    backbone: "../assets/js/libs/backbone",
    kinvey: "../assets/js/libs/kinvey-js-0.9.3"
  },

  shim: {
    backbone: {
      deps: ["lodash", "jquery", "kinvey"],
      exports: "Backbone"
    }
  }
});
