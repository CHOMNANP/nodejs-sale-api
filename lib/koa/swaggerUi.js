const { resolve } = require('path');
const { koaSwagger } = require('koa2-swagger-ui');
const yamljs = require('yamljs');

const swaggerUiAdminApi = koaSwagger({
    title: 'Admin Api', // page title
    // oauthOptions: {}, // passed to initOAuth
    swaggerOptions: { // passed to SwaggerUi()
        // dom_id: 'swagger-ui-container',
        // url: 'http://petstore.swagger.io/v2/swagger.json', // link to swagger.json
        supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
        docExpansion: 'none',
        jsonEditor: true,
        defaultModelRendering: 'schema',
        showRequestHeaders: false,
        swaggerVersion: 'x.x.x', // read from package.json,
        validatorUrl: null, // disable swagger-ui validator
        spec: yamljs.load(resolve('./docs/admin-api.swagger.yaml'))
    },
    routePrefix: '/docs/admin-api', // route where the view is returned
    specPrefix: '/docs/swagger.json', // route where the spec is returned
    exposeSpec: false, // expose spec file
    hideTopbar: true, // hide swagger top bar
    favicon: '/favicon.png', // default favicon
});

module.exports = [ swaggerUiAdminApi];