"use strict";

// -----
var tar = require('tar');
var { Readable } = require('stream');
// -----

// ----- logger [ start ] -----
const logger = require('../utils/logger').getLogger("Controllers file");
// ----- logger [ end ] -----

var getTar = function (compressionCWD, compressionPath) {
  return new Promise((resolve, reject) => {
    try {
      let tarStream = tar.c(
        {
          gzip: true,
          cwd: compressionCWD
        },
        [compressionPath]
      );
      tarStream.on('error', error => { reject(error) })
      tarStream.on('readable', () => {
        resolve(tarStream);
      });
    } catch (error) {
      logger.error(error);
      reject(error);
    }
  });
};

var setTar = function (file, destDir) {
  return new Promise((resolve, reject) => {
    try {
      let readable = new Readable();
      readable._read = () => { } // _read is required but you can noop it
      readable.push(file.data);
      readable.push(null);
      let tarWriteStream = tar.x({
        keep: true,
        // strip: 1,
        C: destDir
      });
      readable.pipe(
        tarWriteStream
      );
      tarWriteStream.on('close', () => {
        resolve();
      });
      tarWriteStream.on("error", (error) => {
        reject(error);
      });
    } catch (error) {
      logger.error(error);
      reject(error);
    }
  });
};

module.exports = {
  getTar,
  setTar
};
