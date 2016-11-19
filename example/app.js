'use strict';

var canary_middleware = require('../index.js');
var express = require('express');

var app = express();

var CANARY_TOKEN = "L3sGdiK2zz4pQ8ilVKjrCDp1zKCmp8";

var canary = canary_middleware.canary({
    server: "localhost",
    port: "9090",
    token: CANARY_TOKEN,
});
app.use(canary);

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000);
