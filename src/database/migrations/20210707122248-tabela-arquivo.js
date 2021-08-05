'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('arquivo', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      produtoId:{
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'produto'
        }
      },
      nome_original: Sequelize.STRING,
      tipo: Sequelize.STRING,
      nome: Sequelize.STRING,   //salvar um timestamp antes 2123211211-nome_original
      tamanho: Sequelize.NUMERIC,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('arquivo');
    
  }
};
