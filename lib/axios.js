const axios = require('axios');
// const path = require('path');
const https = require('https');


const instance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    }),
    timeout: 60000
});


module.exports = {
    axios: instance
};
