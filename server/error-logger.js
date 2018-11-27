
var winston = require('../common/utils/logger.js').logger;
var moment = require('moment');

module.exports = function createErrorLogger(options) {
    return function logError(err, req, res, next) {
      // your custom error-logging logic goes here
      // console.log(`In error-logger.js with ${err}`);
      winston.error(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSSS')}] Error picked up by middleware strong-error-handler: ${err}`);
      next(err);
    };
  }