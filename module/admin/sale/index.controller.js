const { resolve } = require('path');
const _ = require('lodash');

const saleService = require(resolve('./module/share/admin/sale/index.service'));

const { saleStatsKey } = require(resolve(
    './lib/enum'
));


const {
    sequelize    
} = require(resolve('./lib/model'));

// const { getPagination } = require(resolve('./lib/util'));

const rule = {    
    summary: {
        dateFrom: 'required|date',
        dateTo: 'required|date',
        stats: `required|string|in:${saleStatsKey.day},${saleStatsKey.week},${saleStatsKey.month}`
    },
    create: {
        userName: 'required|string',
        amount: 'required|numeric|min:0.01'
    }
};

module.exports = {
    create,
    summary,    
    rule
};


async function summary(ctx){    
    // const auth = ctx.state.user;
    const payload = ctx.payload;
    // const pagination = getPagination(payload);
    
    const result = await saleService.summary({
        qry:{
           dateFrom: payload.dateFrom,
           dateTo: payload.dateTo,
           stats: payload.stats
        },
        pagination: {
            limit: 100,
            offset: 0
        },
        opts: {}
   })

   ctx.success(result)
}


async function create(ctx) {       
    const payload = ctx.payload;    

    const t = await sequelize.transaction();
    const opts = {
        transaction: t
    };

    try {
        //Service accept array of data for batch usage
        await saleService.create({
            data: [payload],
            opts
        })
      
        await t.commit();
        return ctx.success();     
    } catch (ex) {
        console.log({ex});        
        await t.rollback();
        // Sentry.captureException(ex);
        return ctx.fail();
    }
}