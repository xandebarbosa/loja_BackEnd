'use strict';

const { sequelize } = require("../../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("endereco", {
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
      cep: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rua: {
        type: Sequelize.STRING,
        allowNull: false,  //permitir nulo - preenchimento do campo é obrigatório
      },
      numero: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bairro: Sequelize.STRING,
      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("endereco");
  },
};
