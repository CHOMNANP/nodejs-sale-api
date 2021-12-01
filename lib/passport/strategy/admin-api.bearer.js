const BearerStrategy = require('passport-http-bearer');
// const CustomBearerStrategy = require('passport-http-custom-bearer');
const { resolve } = require('path');
const { verifyJwt } = require(resolve('./lib/jwt'));
const { app: appConf } = require(resolve('./lib/config'));
const _ = require('lodash');

const {
    jwtSubject,
    jwtModel
} = require(resolve('./lib/enum'));

const strategy = new BearerStrategy(
    function (token, done) {

        const { isSuccess, data: accessTokenData } = verifyJwt({
            token: token,
            secret: appConf.adminApiJwtSecret
        })

        if (!isSuccess) {
            return done(null, false);
        }

        if (_.get(accessTokenData, 'subject', null) != jwtSubject.api) {
            done(null, false);
        }

        if (_.get(accessTokenData, 'model', null) != jwtModel.admin) {
            done(null, false);
        }

        const user = {
            subject: _.get(accessTokenData, 'subject', null),
            model: _.get(accessTokenData, 'model', null),
            key: _.get(accessTokenData, 'key', null),
        }

        return done(null, user, { scope: 'all' })
    }
)


module.exports = [
    {
        key: 'admin-api:bearer:auth',
        strategy: strategy
    },

];
