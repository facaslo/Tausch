const url = require('url');
const proxy = require('express-http-proxy');

// New hostname+path as specified by question:
const apiProxy = proxy('93.188.164.106:4000/postimage', {
    proxyReqPathResolver: req => url.parse(req.baseUrl).path
});