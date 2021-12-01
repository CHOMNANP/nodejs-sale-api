const bluebird = require("bluebird");
const crypto = require("crypto");
const _ = require("lodash");

module.exports = {
    sleep: bluebird.promisify(sleep),
    sha512: sha512,
    getIPAddress: getIPAddress,
    getUTCTimestamp: getUTCTimestamp
};

function getUTCTimestamp(d) {
    d = d || new Date();
    return new Date(d).getTime() + (new Date(d).getTimezoneOffset() * 60 * 1000);
}

function sha512(str, encode = "base64") {
    const shasum = crypto.createHash("sha512");
    shasum.update(str + "");
    return shasum.digest(encode);
}

function sleep(time, callback) {
    setTimeout(function () {
        callback(null, true);
    }, time);
}

function getIPAddress(req) {
    let ipAddr = req.headers["x-forwarded-for"];
    if (ipAddr) {
        const list = ipAddr.split(",");
        ipAddr = list[list.length - 1];
    } else {
        ipAddr = req.connection.remoteAddress;
    }
    return ipAddr;
}
