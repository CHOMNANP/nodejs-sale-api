const jwt = require('jsonwebtoken');

const { resolve } = require('path');
const Sentry = require(resolve('./lib/sentry'));
const jwtOption = {
    issuer: 'demo-api'    
};
const _ = require('lodash');

module.exports = {
    verifyJwt,
    signJwt
};

function verifyJwt({ token, secret }) {
    try {
        const payload = jwt.verify(token, secret, jwtOption);
        return {
            isSuccess: true,
            data: {
                subject: _.get(payload, 'sub', ''),
                model: _.get(payload, 'model', ''),
                key: _.get(payload, 'key', '')
            }
        };
    } catch (ex) {
        // Sentry.captureException(ex);
    }

    return {
        isSuccess: false
    };
}

function signJwt({ subject, model, key, secret, options }) {
    const payload = {
        sub: subject,
        model: model,
        key: key
    };    

    const localJwtOption = {
        ...jwtOption,        
    }    

    localJwtOption.expiresIn = _.get(options,'expiresIn','365d');

    const token = jwt.sign(payload, secret, localJwtOption);
    return {
        isSuccess: true,
        token
    };
}
