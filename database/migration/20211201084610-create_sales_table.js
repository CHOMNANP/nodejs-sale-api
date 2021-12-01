'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {    
    return queryInterface.createTable('sales', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      amount: {
        allowNull: true,
        type: Sequelize.DECIMAL(15,2)
      },            
      date: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },      
      week: {
        allowNull: true,
        type: Sequelize.STRING(10)
      },
      hour: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {    
    return queryInterface.dropTable('sales');
  }
};
