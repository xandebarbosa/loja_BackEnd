'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert(
      "fornecedor", 
      [
        {
          nome: "John Alimentos",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Rota 66",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], 
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete("fornecedor", null, {});
     
  }
};
