"use strict";

// ----- logger [ start ] -----
const logger = require('../utils/logger').getLogger("Route > file");
// ----- logger [ end ] -----

// ----- controllers [ start ] -----
var fileController = require('../controllers/file');
// ----- controllers [ end ] -----

const router = require('express').Router();

router.get('/getFiles', (req, res, next) => {
    let compressionCWD = config.compressionCWD;
    let compressionPath = config.compressionPath;

    fileController.getTar(compressionCWD,compressionPath, res).then((tarStream) => {
        res.writeHead(200, {
            "Content-Type": "application/octet-stream",
            "Content-Disposition": "attachment; filename=" + "keys.tar.gz"
        });
        tarStream.pipe(res);
    }).catch((error) => {
        logger.error(error);
        next(error);
    });
});

router.post('/setFiles', (req, res, next) => {
    let file = req.files.tar;
    let destDir = config.decompressionPath;
    fileController.setTar(file, destDir)
        .then(() => {
            res.send({
                success: true,
                resCode: "OK_SETKEY_1",
                errorType: 0,
                message: {
                    desc: "Keys set successfully"
                }
            });
        })
        .catch((error) => {
            logger.error(error);
            res.send({
                success: false,
                resCode: "ERR_SETKEY_2",
                errorType: 2,
                message: {
                    desc: "Keys not set"
                }
            });
        });
});

module.exports = router;