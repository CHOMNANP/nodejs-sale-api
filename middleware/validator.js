

const path = require("path");
const logger = require(path.resolve("./lib/logger"))("middleware/validation");

const assert = require("assert");
const _ = require("lodash");

module.exports = {
    validate: validate
};
function validate(rule) {
    return async (ctx, next) => {
        logger.info("req body", JSON.stringify(ctx.payload));

        let valid = null;
        
        switch (ctx.method) {
            case 'GET':
                valid = ctx.validate(ctx.query, rule);
                break;
            default:
                valid = ctx.validate(ctx.payload, rule);
        }

        if (valid.fails()) {
            let errors = _.toPairs(valid.errors.all());
            return assert(false, valid.errors.first([_.first(errors[0])]));            
        }

        await next();
    };
}
