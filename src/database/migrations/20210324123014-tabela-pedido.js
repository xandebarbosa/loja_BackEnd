'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pedido", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        references:{
          model:"usuario",
          key:"id",
        },
      },

      valor: {
        type: Sequelize.INTEGER,
        allowNull: false,  //permitir nulo - preenchimento do campo é obrigatório
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'Processando..',
      },
      forma_pagamento: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("pedido");
  },
};
