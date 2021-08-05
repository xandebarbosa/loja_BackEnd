'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cor', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      
      produtoId:{
        type: Sequelize.INTEGER,
        references:{
          model: "produto",
          key: "id",
        },
      },
      quantidade: Sequelize.INTEGER,
      cor: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cor');
    
  }
};
