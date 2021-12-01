const passport = require('koa-passport');
let strategies = [];

strategies = strategies.concat(require('./strategy/admin-api.bearer'));

for (let itm of strategies) {
    passport.use(itm.key, itm.strategy);
}

module.exports = {
    passport
};