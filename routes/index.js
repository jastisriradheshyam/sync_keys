"use strict";

// ----- logger [ start ] -----
const logger = require('../utils/logger').getLogger("Route");
// ----- logger [ end ] -----

const router = require('express').Router();

// ----- routes [ start ] -----
var fileRoute = require('./file');
// ----- routes [ end ] -----

// tar file based routes
router.use('/file', fileRoute);

// ----- Exception handling routes [ start ] -----
router.use((req, res, next) => {
    try {
        logger.debug("wrong route");
        res.send({
            "success": false,
            "resCode": "err_wrg_route_1",
            "errorType": 2,
            "message": {
                "desc": `Wrong route ${req.originalUrl}`
            }
        });
    } catch (error) {
        next(error);
    }
});

router.use(function (err, req, res, next) {
    logger.error(err.stack)
    res.status(500).send({
        "success": false,
        "resCode": "err_route_unexp",
        "errorType": 1,
        "message": {
            "desc": `something went wrong at ${req.originalUrl}`
        }
    });
});
// ----- Exception handling routes [ end ] -----

module.exports = router;