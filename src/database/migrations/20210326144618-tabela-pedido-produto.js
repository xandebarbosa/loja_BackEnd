'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pedido_produto", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pedidoId: {
        type: Sequelize.INTEGER,
        references: {
          model: "pedido",
          key: "id",
        },
      },
      produtoId: {
        type: Sequelize.INTEGER,
        references: {
          model: "produto",
          key: "id",
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("pedido_produto");
  },
};
