require('dotenv').config();
const { resolve } = require('path');
// const { 
//     sequelize, 
//     AdminUser 
// } = require('../lib/model');

const _ = require('lodash');

const { app: appConf } = require(resolve('./lib/config'));
const { jwtSubject, jwtModel } = require(resolve('./lib/enum'));
const { signJwt } = require(resolve('./lib/jwt'));


const args = process.argv.slice(2);

async function run() {
    // const adminUser = await AdminUser.findByPk(+args[0]);

    const { token: jwtToken } = signJwt({
        subject: jwtSubject.api,
        model: jwtModel.admin,
        //Using dummy admin user for testing purpose
        key: 'dbeface0-1042-40e5-9f31-eac2c4520692',// adminUser.sessionUuid, 
        secret: appConf.adminApiJwtSecret
    });

    console.log({
       Authorization: `Bearer ${jwtToken}`
    });

}

run();
