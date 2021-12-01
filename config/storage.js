const _ = require('lodash');

module.exports = {
    SPACES_KEY: _.get(process, 'env.AWS_ACCESS_KEY_ID', 'dummy'),
    SPACES_SECRET: _.get(process, 'env.AWS_SECRET_ACCESS_KEY', 'dummy'),
    SPACES_ENDPOINT: _.get(process, 'env.AWS_URL', 'dummy'),
    SPACES_REGION: _.get(process, 'env.AWS_DEFAULT_REGION', 'dummy'),
    SPACES_BUCKET: _.get(process, 'env.AWS_BUCKET', 'dummy'),
    AWS_S3_HOST: _.get(process, 'env.AWS_S3_HOST', 'dummy')
};
