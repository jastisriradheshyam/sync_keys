"use strict";

const log4js = require('log4js');

/**
 * return the logger object
 * @param {String} moduleName 
 */
const getLogger = function (moduleName) {
    var logger = log4js.getLogger(moduleName);
    logger.level = config.logLevel || 'DEBUG';
    return logger;
};

module.exports = {
    getLogger
};