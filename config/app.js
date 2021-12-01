const _ = require('lodash');

module.exports = {
    nodeEnv: _.get(process, 'env.NODE_ENV', 'local'),
    host: '*',
    port: _.get(process, 'env.APP_PORT', 8080),
    ssl: null,
    viewCache: false,
    staticCache: 1000 * 60 * 60 * 24,
    encryptionAlgorithm: 'aes-256-ctr',    
    timeZone: _.get(process, 'env.TZ', 'Asia/Phnom_Penh'),
    maxSelectRow: 1000,    
    adminApiJwtSecret: _.get(
        process,
        'env.APP_VET_API_JWT_SECRET',
        'sdfsd^26asdfzf2K425sdaF#>e7(sdfasuz?asdfsdf>usJ/VSd^sdf'
    ),
    appNamespace: _.get(process, 'env.NODE_ENV', 'local')
};
