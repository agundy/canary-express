'use strict';

var http = require('http');
var onFinished = require('on-finished');
var onHeaders = require('on-headers');

function canary(options) {
    var opts = options || {};
    if (!opts.token) {
        console.log("WARNING: Canary needs a token for requests to be registered");
    }
    // if the server options wasn't defined use the default server
    if (!opts.server) {
        opts.server = "https://canary.agundy.com";
    }
    if (!opts.port) {
        opts.port = "443";
    }

    return function canary(req, res, next) {
        function sendRequestEvent() {
            var reqEvent = {
                "host": req.hostname,
                "code": res.statusCode,
                "endpoint": req.originalUrl
            };

            var body = JSON.stringify(reqEvent);

            var request = new http.ClientRequest({
                host: opts.server,
                port: opts.port,
                path: '/api/event',
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.byteLength(body),
                    "CANARY_TOKEN": opts.token
                }
            });

            request.end(body);
        }

        // TODO get more params and then send request to Canary server
        req._remoteAddress = req.ip;

        // use onHeaders to time request
        //onHeaders(res, recordStartTime);

        // log when response finished
        onFinished(res, sendRequestEvent);

        next();
    };
}

exports.canary = canary;
