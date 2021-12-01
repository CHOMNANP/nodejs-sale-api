module.exports = function validate() {
    return async (ctx, next) => {
        ctx.success = (data = null, status = 200, message = "success") => {
            ctx.status = status;
            ctx.body = { error: false, message: message, data: data };
        };
        ctx.fail = (data = null, status = 400, message = "failed") => {
            ctx.status = status;
            ctx.body = { error: true, message: message, data: data };
        };
        ctx.err = (data = null, status = 500, message = "error") => {
            ctx.status = status;
            ctx.body = { error: true, message: message, data: data };
        };
        await next();
    };
};
