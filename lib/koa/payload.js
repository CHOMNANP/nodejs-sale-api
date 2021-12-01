module.exports = function payload() {
    return async (ctx, next) => {

        if (ctx.method == 'GET') {
            ctx.payload = ctx.request.query;
        } else {
            ctx.payload = ctx.request.body;
        }

        await next();
    };
};

