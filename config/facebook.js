const _ = require("lodash");

module.exports = {
    customerWebAppId: _.get(process, "env.CUSTOMER_WEB_FACEBOOK_APP_ID", ''),
    customerWebAppSecret: _.get(process, "env.CUSTOMER_WEB_FACEBOOK_APP_SECRET", ''),
    customerWebAppLoginCallbackUrl: _.get(process, "env.CUSTOMER_WEB_FACEBOOK_APP_LOGIN_CALLBACK_URL", ''),

};