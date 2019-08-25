"use strict";

// ----- set config [ start ] -----
require('./utils/setConfig');
const port = config.port || 3000;
// ----- set config [ start ] -----

var express = require('express');
var fileUpload = require('express-fileupload');

// routes
var routes = require('./routes/index');

var app = express();
app.use(express.static('public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(fileUpload({
    limits: { fileSize: 500 * 1024 * 1024 },
}));
app.use(routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));