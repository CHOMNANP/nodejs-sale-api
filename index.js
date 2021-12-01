#!/bin/bash
// const cls = require('continuation-local-storage');
require('dotenv').config();
const path = require('path');
// require(path.resolve('./lib/elastic')); //Elastic should be on the top of other library

const { app: appConfig } = require('./lib/config');
const domain = require('domain');
const fs = require('fs');
const logger = require('./lib/logger')('index');
const app = require('./lib/koa');
// const socket = require(path.resolve('./module/socket/index'));
// require('./lib/rabbitmq');
// require('./lib/telegram');
// require('./lib/cron');


require(path.resolve('./lib/i18n'));
// run every request handler inside a domain controller
const handler = function (req, res, app) {
    const d = domain.create();
    d.on('error', function (err) {
        logger.error('error' + err.message);
        logger.debug('error' + err.stack);
        try {
            res.statusCode = 500;
            // res.setHeader("content-type", "text/plain");
            res.end('Oops, there was a problem!\n');
        } catch (er2) {
            // oh well, not much we can do at this point.
            logger.debug('Error sending 500! ' + er2.stack);
        }
    });
    d.add(req);
    d.add(res);
    d.add(app);

    // Now run the handler function in the domain.
    d.run(function () {
        app(req, res);
    });
};

let server = null;

if (appConfig.ssl) {
    const https = require('https');
    const privateKey = fs.readFileSync(appConfig.ssl.key, 'utf8');
    const certificate = fs.readFileSync(appConfig.ssl.cert, 'utf8');

    const credentials = {
        key: privateKey,
        cert: certificate
    };

    server = https.createServer(credentials, function (req, res) {
        handler(req, res, app.callback());
    });

    server.listen(appConfig.port || 8443, function () {
        logger.info(
            'HTTPS Server started and listening on port ' +
                (appConfig.port || 8443)
        );
    });
} else {
    const http = require('http');

    server = http.createServer((req, res) => handler(req, res, app.callback()));

    server.listen(appConfig.port || 8080, function () {
        logger.info(
            'HTTP Server started and listening on port ' +
                (appConfig.port || 8080)
        );
    });
}

process.on('uncaughtException', function (err) {
    logger.info('UncaughtException:' + err.message);
    logger.error('Application crashed!!! Stack trace:\n' + err.stack);
    process.exit(1);
});

// socket.startSocket(server);
module.exports = server;
