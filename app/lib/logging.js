
define([
  "lodash"
],

function(_) {

  var logLevel = 1;
  var moduleLogLevel = {};
  var logger;

  var consoleLog = function(txt) {
    console.log(txt);
  }; 

  var levels = {
    debug: {
      level: 0,
      output: consoleLog
    },
    info: {
      level: 1,
      output: consoleLog
    },
    warn: {
      level: 2,
      output: consoleLog
    },
    error: {
      level: 3,
      output: consoleLog
    }
  };

  var logMessage = function(message) {
    var output = levels[message[0]].output;
    output(message[0] + ": " + message[1] + " - " + message[2]);
  };

  var log = function(levelName, prefix, message, data) {
    var effectiveLogLevel = logLevel;
    if (moduleLogLevel.hasOwnProperty(prefix)) {
      effectiveLogLevel = moduleLogLevel[prefix];
    }
    if (levels[levelName].level < effectiveLogLevel) {
      return;
    }
    logMessage(arguments);
  };

  var createWrapper = function(moduleName) {
    var that = {};
    var addPrefix = function(levelName) {
      that[levelName] = function() {
        log(levelName, moduleName, arguments[0], arguments[1]);
      };
    };
    _.each(_.keys(levels), addPrefix);
    return that;
  };

  //  TODO: set this up at some point
  //
  /*
  var extractModuleName = function(callingModule) {
    var parts = callingModule.split('/');
    var index = parts.length - 1;
    while ((index > 0) && (parts[index] !== 'src')) {
      index -= 1;
    }
    return parts.slice(index + 1).join('/');
  };
  */

  var getLogger = function(callingModule) {
    //var moduleName = extractModuleName(callingModule.filename);
    var moduleName = callingModule;
    /*
    logger.info('Creating logger', {
      moduleName: moduleName
    });
    */
    return createWrapper(moduleName);
  };

  logger = createWrapper('lib/logging.js');

  return { 
    getLogger: getLogger
  };

});
