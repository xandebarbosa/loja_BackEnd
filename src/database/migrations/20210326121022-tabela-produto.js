'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("produto", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      
      fornecedorId:{
        type: Sequelize.INTEGER,
        references:{
          model: "fornecedor",
          key: "id",
        },
      },
      categoriaId:{
        type: Sequelize.INTEGER,
        references:{
          model: "categoria",
          key: "id",
        },
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,  //permitir nulo - preenchimento do campo é obrigatório
        validade:{
          notNull:{
            msg: 'Por favor digite o nome do produto'
          },
        },
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validade:{
          notNull:{
            msg: 'Por favor digite a quantidade de produtos'
          }
        },
      },
      preco: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validade:{
          notNull:{
            msg: 'Por favor digite o preco do produto'
          }
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("produto");
  },
};
