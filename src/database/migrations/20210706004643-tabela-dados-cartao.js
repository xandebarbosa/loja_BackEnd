'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dados_cartao', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      
      pedidoId:{
        type: Sequelize.INTEGER,
        references:{
          model: "pedido",
          key: "id",
        },
      },
      bandeira_cartao: Sequelize.STRING,
      numero_cartao: Sequelize.STRING,
      nome_completo: Sequelize.STRING,
      data_vencimento: Sequelize.STRING,
      codigo_seguranca: Sequelize.STRING,
      cpf: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('dados_cartao');
    
  }
};
