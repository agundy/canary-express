'use strict';

function canary(options) {
    var opts = options || {}
    if (!opts.token) {
        console.log("Error need to set the token");
    }
    // if the server options wasn't defined use the default server
    if (!opts.server) {
        opts.server = "https://canary.agundy.com";
    }
    return function(req, res, next) {
        // TODO get more params and then send request to Canary server
        console.log(req.originalUrl);
        next();
    };
}
