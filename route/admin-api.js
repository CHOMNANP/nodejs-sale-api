const router = require('koa-router')({
    prefix: '/api/admin/'
});

const { resolve } = require('path');
const { passport } = require(resolve('./lib/passport'));
const authMiddleware = require(resolve('./middleware/auth'));
const adminSaleCtrl = require(resolve('./module/admin/sale/index.controller'));
const { validate } = require(resolve('./middleware/validator'));

router.post(
    'sale',
    passport.authenticate('admin-api:bearer:auth', { session: false }),
    authMiddleware.canAccessAdminApi,
    validate(adminSaleCtrl.rule.create),
    adminSaleCtrl.create
);


router.get(
    'sale/summary',
    passport.authenticate('admin-api:bearer:auth', { session: false }),
    authMiddleware.canAccessAdminApi,
    validate(adminSaleCtrl.rule.summary),
    adminSaleCtrl.summary
);

module.exports = router;
