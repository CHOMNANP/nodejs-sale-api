const { resolve, join } = require('path');
// const Sentry = require(resolve('./lib/sentry'));

const { QueryTypes } = require('sequelize');
const _ = require('lodash');

const { saleStatsKey } = require(resolve(
    './lib/enum'
));

// const Dinero = require(resolve('./lib/dinero'));
const moment = require(resolve('./lib/moment'));

const {
    sequelize,
    Sale    
} = require(resolve('./lib/model'));

module.exports = {
    create,    
    summary,    
};

async function create({        
    data,
    opts
}) {
 
    const { data: saleList } = prepareCreateData({        
        data: data
    })
    
    const sales = await Sale.bulkCreate(saleList, opts);
    
    return {
        sales: sales
    };
}

function prepareCreateData({     
    data
}) {

    const todayDate = moment();
    const dateString = todayDate.format('YYYY-MM-DD'),
          weekString = todayDate.format('YYYY-ww'),
          hourString = todayDate.format('HH')

    const saleList = _.map(data, (saleItem)=> {                   
        return { 
            userName: _.get(saleItem, 'userName', ''),
            amount: _.get(saleItem, 'amount') || 0,
            date: dateString,
            week: weekString,
            hour: hourString,
        }
    });

    return {
        data: saleList
    };
}

async function summary({ 
    qry, 
    pagination,     
    opts 
}) {
    const {
        dateFrom,
        dateTo,
        stats
    } = qry;

    let paginationQry = '';

    const replacementQry = {
        dateFrom: dateFrom,
        dateTo: dateTo
    }

    if (pagination) {
        paginationQry = `LIMIT ${pagination.limit} OFFSET ${pagination.offset}`;
    }    
    
    let reportFunc;
    
    switch(stats){
        case saleStatsKey.day:
            reportFunc = getDaySummary;
        break;

        case saleStatsKey.week:
            reportFunc = getWeekSummary;
        break;

        case saleStatsKey.month:
            reportFunc = getMonthSummary;
        break;
    }

    const {        
        rows: rows
    } = await reportFunc({
        replacementQry: replacementQry,
        paginationQry: paginationQry,
        opts: opts
    });

    for(let row of rows){
        row.stats = stats;
    }

    return {
        // page: _.get(pagination, 'page', null) || 1,
        // limit: _.get(pagination, 'limit', null),
        count: _.size(rows),        
        rows: rows
    };
}


async function getDaySummary({
    replacementQry,
    paginationQry,
    opts
}){

    const selectQry = ` SELECT 	
                            sl.date,
                            sl.hour,
                            sum(sl.amount) as total
                        FROM sales as sl
                        WHERE sl.date >= :dateFrom
                            AND sl.date <= :dateTo
                        GROUP by sl.date, sl.hour
                        ORDER BY sl.date, sl.hour
                        ${paginationQry}
`;

    const {
        '0': rows        
    } = await Promise.all([
        sequelize.query(
            selectQry,
            {
                type: QueryTypes.SELECT,
                replacements: replacementQry,
                transaction: _.get(opts, 'transaction', null)
            }
        )
    ]);
    
    return {
       rows: rows       
    }
}



async function getWeekSummary({
    replacementQry,
    paginationQry,
    opts
}){

    const {
        '0': rows,
    } = await Promise.all([
        sequelize.query(
            `SELECT 	
                sl.week,
                sl."date",
                sum(sl.amount) as total
            FROM sales as sl
            WHERE sl.date >= :dateFrom
                AND sl.date <= :dateTo
            GROUP by sl.week, sl.date
            ORDER BY sl.date
            ${paginationQry}            
            ;
            `,
            {
                type: QueryTypes.SELECT,
                replacements: replacementQry,
                transaction: _.get(opts, 'transaction', null)
            }
        )
    ]);
    
    return {
        rows: rows
    }
}

async function getMonthSummary({
    replacementQry,
    paginationQry,
    opts
}){    

    const {
        '0': rows,
    } = await Promise.all([
        sequelize.query(
            `SELECT 	
                sl.week as week,	
                sum(sl.amount) as total
            FROM sales as sl
            WHERE sl.date >= :dateFrom
                AND sl.date <= :dateTo
            GROUP by sl."week"
            ORDER BY sl.week
            ${paginationQry}            
            ;
            `,
            {
                type: QueryTypes.SELECT,
                replacements: replacementQry,
                transaction: _.get(opts, 'transaction', null)
            }
        )
    ]);


    
    return {
        rows: rows        
    }
}