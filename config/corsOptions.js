module.exports = {
    "origin": "*", // change this to specific domain for security purpose
    "methods": [
        "GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"
    ],
    "preflightContinue": false,
    "allowHeaders": ["origin", "content-type", "accept", "authorization", "Accept-Language", 'X-Staff-Access-Token', 'X-Company-Id'],
    "maxAge": 1000,
    "maxSelectRow": 100,
    "credentials": false,
    "exposeHeaders": ["content-type", "accept", "authorization", "Accept-Language",]
};