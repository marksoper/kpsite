

define([
  "app",
  "backbone"
],

function(app, Backbone) {
  
  var Main = Backbone.View.extend({
    template: "main",
    initialize: function() {
      this.subviews = [];
    },
    addSubview: function(view, container) {
      container = container || "#main";
      this.subviews.push({
        view: view,
        container: container
      });
    },
    render: function() {
      var self = this;
      Backbone.View.prototype.render.call(this);
      self.subviews.forEach(function(subview) {
        self.$el.find(subview.container).html(subview.view.render().el);
      });
      return this;
    }
  });

  app.Views = app.Views || {};
  app.Views.Main = Main;

  return Main;

});