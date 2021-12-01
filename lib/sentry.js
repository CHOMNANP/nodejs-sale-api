const path = require('path');
const Sentry = require('@sentry/node');

const { sentry: sentryConfig } = require(path.resolve('./lib/config'));

if (process.env.SENTRY_ENABLE) {
    Sentry.init({
        dsn: sentryConfig.host,
        release: 'my-project-name@2.3.12',
        environment: process.env.NODE_ENV || 'local'
    });

    Sentry.captureMessage('server is starting up');
}
module.exports = Sentry;
