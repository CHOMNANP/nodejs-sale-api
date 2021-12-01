'use strict';

const { resolve } = require('path');
const moment = require(resolve('./lib/moment'));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const saleList = [];
    let momentDate = moment().add(-10, 'days');
    for(let dateIdx = 0; dateIdx < 10; dateIdx++){
      momentDate = momentDate.add(1, 'days');

      let date = momentDate.format('YYYY-MM-DD');
      let week = momentDate.format('YYYY-ww');
      let hourDate = momentDate.clone().set({hour:9});
      for(let saleIdx = 0; saleIdx < 5; saleIdx++){
        hourDate = hourDate.add(1, 'hours');      
                
        saleList.push({        
          userName: 'Jonh',
          amount: hourDate.hour() + saleIdx + dateIdx,          
          date: date,
          week: week,
          hour: hourDate.format('HH'),
          createdAt: hourDate.toISOString(),
          updatedAt: hourDate.toISOString()
        })

        saleList.push({        
          userName: 'Roma',
          amount: hourDate.hour() + saleIdx + dateIdx + 1,          
          date: date,
          week: week,
          hour: hourDate.format('HH'),
          createdAt: hourDate.toISOString(),
          updatedAt: hourDate.toISOString()
        })
      }      
    }

    return queryInterface.bulkInsert('sales', saleList, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('sales', null, {});
     */

     return queryInterface.bulkDelete('sales', null, {});
  }
};
