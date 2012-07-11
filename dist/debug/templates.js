this['JST'] = this['JST'] || {};

this['JST']['app/templates/auth.html'] = function(data) { return function (obj,_) {
var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('\n<div id="login">\n  Login With Facebook\n</div>');}return __p.join('');
}(data, _)};

this['JST']['app/templates/main.html'] = function(data) { return function (obj,_) {
var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('\n<div role="main" id="main">\n  <div id="header">\n    Klothespin\n  </div>\n  <div id="content">\n    Hi ', user.name.full ,'\n  </div>\n</div>');}return __p.join('');
}(data, _)};

this['JST']['app/templates/splash.html'] = function(data) { return function (obj,_) {
var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('\n<div id="splash">\n  <div id="logo">\n    <img src="/assets/img/kplogo.png">\n  </div>\n</div>');}return __p.join('');
}(data, _)};