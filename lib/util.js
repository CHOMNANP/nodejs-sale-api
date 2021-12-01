const path = require('path');
// const { once: redisLib, nameSpace: redisNameSpace } = require(path.resolve(
//     './lib/redis'
// ));
const logger = require(path.resolve('./lib/logger'))('lib/util');
const { i18n: i18nLib, app: appConfig } = require(path.resolve('./lib/config'));
const bcrypt = require('bcrypt');
const _ = require('lodash');
const glocales = ['km', 'en', 'vn', 'ch'];

const moment = require('./moment');

module.exports = {
    // setAuthTokenLocale,
    // getAuthTokenLocale,
    // generateSignatureSequence,
    // validOrder
    createPasswordAsync,
    comparePasswordAsync,
    makeTrackingNo,
    getPagination
};

async function comparePasswordAsync({
    password, //Input Text password
    hash //saved hash password
}) {
    let hashPwd = _.replace(hash, /^\$2y(.+)$/i, '$2a$1');
    return await bcrypt.compareSync(password, hashPwd);
}

async function createPasswordAsync({ password }) {
    const salt = bcrypt.genSaltSync(17);
    console.log({
        password,
        salt
    });
    return await bcrypt.hashSync(password, salt);
}

function getPagination(qry) {
    let page = parseInt(_.get(qry, 'page', 1));
    let limit = parseInt(_.get(qry, 'limit', 10));

    if (limit > appConfig.maxSelectRow) {
        limit = appConfig.maxSelectRow;
    }

    let offset = (page - 1) * limit;
    if (offset < 0) {
        offset = 0;
    }

    return {
        offset: offset,
        limit: limit,
        page: page
    };
}

function makeTrackingNo(length) {
    var result = [];
    // var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result.push(
            characters.charAt(Math.floor(Math.random() * charactersLength))
        );
    }
    return `${moment().format('MMDD')}${result.join('')}`;
}

// function getLanguageQryParam(fieldName) {

//     const localeSqlSelects = [];

//     for (let locale of glocales) {
//         const qryObj = {
//             locale: locale,
//             selectParam: ` ("${fieldName}"#>>'{${locale}}') as "${fieldName}_${locale}"`,
//         };
//         localeSqlSelects.push(qryObj)
//     }

//     return localeSqlSelects;
// }

// function getLanguageQryParams(fieldNames) {
//     let qryParams = [];
//     const qryStr = null;
//     for (let fieldName of fieldNames) {
//         qryParams = qryParams.concat(getLanguageQryParam(fieldName));
//     }

//     for (let idx = 0; idx < (_.size(qryParams) - 1); idx++) {
//         if(qryStr){
//             qryStr = `${qryStr}, ${qryParams[idx].selectParam}`
//         }else{

//         }
//     }

//     return {
//         qryParams: localeSqlSelects,
//     };

// }

// async function setAuthTokenLocale(_authTokenId, _lang) {
//     return await redisLib.setAsync(
//         getAuthTokenRedisKey(_authTokenId),
//         _.toLower(_lang)
//     );
// }

// async function getAuthTokenLocale(_authTokenId) {
//     let locale = await redisLib.getAsync(getAuthTokenRedisKey(_authTokenId));
//     logger.debug('found locale:=================>', locale);
//     if (!locale) {
//         locale = i18nLib.defaultLocale;
//     }
//     return _.toLower(locale);
// }

// function getAuthTokenRedisKey(_authTokenId) {
//     return `${redisNameSpace.locale.auth_token}${redisNameSpace.seperator}${_authTokenId}`;
// }

// function generateSignatureSequence(sequence, privateKey) {
//     const sequences = sequence.split('-');
//     const signatureSequence = _.join(_.shuffle(sequences), '-');
//     return `${signatureSequence}-${privateKey}`;
// }

// function validOrder(order, attributes) {
//     if (!order) return false;

//     const orders = order.split(' ');

//     if (orders.length !== 2) return false;

//     if (attributes.indexOf(orders[0]) < 0) return false;

//     const orderType = ['desc', 'asc'];

//     if (orderType.indexOf(_.toLower(orders[1])) < 0) return false;

//     return true;
// }
