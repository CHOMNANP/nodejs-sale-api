const { resolve } = require('path');
const fs = require('fs');

const {
    app: appConfig,
    security: securityConfig,
    i18n: i18nConfig,
    modules: moduleConfig,
    corsOptions: corsOptionsConfig
    // redis: redisConfig
} = require(resolve('./lib/config'));

// const {
//     once: redisClient
// } = require("./redis");

// thirdparty koa lib
const Koa = require('koa');
const koaLogger = require('koa-logger');
const serve = require('koa-static');
// const hbs = require("koa-hbs");
const helmet = require('koa-helmet');
const cors = require('kcors');
const bodyParser = require('koa-bodyparser');
// const koaBody = require('koa-body');

// const session = require("koa-generic-session");
const compress = require('koa-compress');

// custom koa libs
const koaError = require(resolve('./lib/koa/error'));
const validator = require(resolve('./lib/koa/validator'));
const payload = require(resolve('./lib/koa/payload'));
const response = require(resolve('./lib/koa/response'));
const locales = require(resolve('./lib/koa/locales'));
const swaggerUis = require(resolve('./lib/koa/swaggerUi'));
// const redisStore = require('koa-redis');

// const flash = require('koa-flash');

const { passport } = require(resolve('./lib/passport'));

const app = new Koa();

app.keys = [appConfig.key];

// const CONFIG = {
//     key: 'koa:sess',
//     /** (string) cookie key (default is koa:sess) */
//     /** (number || 'session') maxAge in ms (default is 1 days) */
//     /** 'session' will result in a cookie that expires when session/browser is closed */
//     /** Warning: If a session cookie is stolen, this cookie will never expire */
//     //   maxAge: 86400000,
//     store: redisStore({
//         db: redisConfig.db,
//         client: redisClient
//     }),
//     maxAge: 600000, //10mn
//     overwrite: true,
//     /** (boolean) can overwrite or not (default true) */
//     httpOnly: true,
//     /** (boolean) httpOnly or not (default true) */
//     signed: true,
//     /** (boolean) signed or not (default true) */
//     rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
// };

//HBS Midleware
// app.use(hbs.middleware({
//     viewPath: path.resolve(__dirname, "../view"),
//     layoutsPath: path.resolve(__dirname, "../view/layouts"),
//     partialsPath: path.resolve(__dirname, "../view/layouts/partials"),
//     disableCache: !appConfig.viewCache
// }));


app.use(serve(resolve('./resource/public')));

app.use(koaError());
app.use(validator());
app.use(koaLogger());
// app.use(session(CONFIG, app));
// app.use(flash());
app.use(helmet());
app.use(cors(corsOptionsConfig));
locales(app, i18nConfig);

app.use(passport.initialize());
app.use(passport.session());

for (let swaggerUi of swaggerUis) {
    app.use(swaggerUi);
}

app.use(
    compress({
        filter: (content_type) => {
            return /text/i.test(content_type);
        },
        threshold: 2048,
        gzip: {
            flush: require('zlib').constants.Z_SYNC_FLUSH
        },
        deflate: {
            flush: require('zlib').constants.Z_SYNC_FLUSH
        },
        br: false // disable brotli
    })
);

// if (securityConfig.requestLimit) {
//     // const ratelimit = require("koa-ratelimit");
//     // app.use(ratelimit({
//     //     db: redisClient, // SET A REDIS INSTANCE!
//     //     duration: securityConfig.requestDuration,
//     //     errorMessage: "Sometime we just need to slow down to enjoy the beauty of life.",
//     //     id: (ctx) => ctx.ip,
//     //     headers: {
//     //         remaining: "Rate-Limit-Remaining",
//     //         reset: "Rate-Limit-Reset",
//     //         total: "Rate-Limit-Total"
//     //     },
//     //     max: securityConfig.requestLimit
//     // }));
// }

app.use(bodyParser());

// app.use(bodyParser(
//     {
//         enableTypes: [['json', 'form', 'multipart']]
//     }
// ));
// app.use(koaBody({
//     multipart: true,
//     urlencoded: true,
// }));

app.use(payload());

app.use(response());

for (const module of moduleConfig) {
    let routes = fs.readdirSync(module.routePath);
    for (const route of routes) {
        if (route.endsWith('.js')) {
            const router = require(resolve(module.routePath, route));
            app.use(router.routes());
        }
    }
}

// END TODO LAST PART OF MIDDLEWARE DO NOT WRITE *****"app.use"***** BELOW THIS
// CALL!!!.
app.use(async (ctx) => {
    // we need to explicitly set 404 here so that koa doesn"t assign 200 on body=
    ctx.status = 404;

    switch (ctx.accepts('html', 'json')) {
        // case "html":
        //     ctx.type = "html";
        //     ctx.body = "<p>Page Not Found</p>";
        //     await ctx.render('layouts/404', { });
        //     break;
        case 'json':
            ctx.body = {
                message: 'Page Not Found'
            };
            break;
        default:
            ctx.type = 'text';
            ctx.body = 'Page Not Found';
    }
});

module.exports = app;
