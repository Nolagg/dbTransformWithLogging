'use strict';
/**
 * Configurations of logger (as recommended and defined on stackoverflow)
 *  https://stackoverflow.com/questions/8393636/node-log-in-a-file-instead-of-the-console
 */
var appRoot = require('app-root-path');
var winston = require('winston');

var options = {
    file: {
      level: 'info',
      name: 'file.info',
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
      timestamp: true // this doesn't seem to do anything as I had to manually add the timestamp,
    },
    errorFile: {
        level: 'error',
        name: 'file.error',
        filename: `${appRoot}/logs/error.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 100,
        colorize: true,
        timestamp: true,  // this doesn't seem to do anything as I had to manually add the timestamp
      },    
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: true, // this doesn't seem to do anything as I had to manually add the timestamp
    },
  };

// instantiate a new Winston Logger with the settings defined above
var logger = winston.createLogger({
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.File(options.errorFile),
      new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
  });

// create a stream object with a 'write' function that will be used by the application
logger.stream = {
    write: function(message, encoding) {
      logger.info(message);
    },
  };

module.exports = {
  'logger': logger
};