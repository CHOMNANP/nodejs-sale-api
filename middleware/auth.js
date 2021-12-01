const { resolve } = require("path");
// const assert = require("assert");
const _ = require("lodash");
// const { authenticationService } = require(path.resolve('./lib/grpc'));
// const i18n = require(path.resolve('./lib/i18n'));
// const logger = require(path.resolve("./lib/logger"))("middleware/auth");


const {
    Carrier,
    CarrierBranch,
    CarrierBranchUser,
    CustomerUser,
    OperationUser,
    Driver,
    Company
} = require(resolve('./lib/model'));

module.exports = {
    canAccessAdminApi
};

async function canAccessAdminApi(ctx, next) {
    const user = ctx.state.user;    
    if (!user) {
        return ctx.fail({}, 401, 'Unauthorized');
    }
    ctx.state.user = { //Dummy user for testing purpose, for production find auth based on key
        uuid: ctx.state.user.key,
        userName: 'Dara'
    }    

    await next();
}