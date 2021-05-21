"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("usuario", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false, //permitir nulo - preenchimento do campo é obrigatório
        validade:{
          notNull:{
            msg: 'Por favor digite o nome'
          },
        },
        unique: true, //exclusivo - nome único - não permite repetir
      }, 
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        validade:{
          notNull:{
            msg: 'Por favor digite o login'
          }
        },
        unique: true,
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
        validade:{
          notNull:{
            msg: 'Por favor digite a senha'
          }
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("usuario");
  },
};
