

define([
  "app",
  "backbone"
],

function(app, Backbone) {
  
  var Main = Backbone.View.extend({
    template: "main",
    // TODO: move into a layout based view
    initialize: function() {
      this.subviews = [];
      // TODO: implement this in a Backbone fashion
      //document.getElementById('auth-logoutlink').addEventListener('click', function(){
      //  FB.logout();
      //});
    },
    // TODO: move into a layout based view
    addSubview: function(view, container) {
      container = container || "#main";
      this.subviews.push({
        view: view,
        container: container
      });
    },
    // TODO: move into a layout based view
    render: function() {
      var self = this;
      Backbone.View.prototype.render.call(this);
      self.subviews.forEach(function(subview) {
        self.$el.find(subview.container).html(subview.view.render().el);
      });
      return this;
    }
  });

  return Main;

});