const Validator = require("validatorjs");

module.exports = function validate() {
    return async (ctx, next) => {
        ctx.validate = (data, rules) => new Validator(data, rules);
        await next();
    };
};
