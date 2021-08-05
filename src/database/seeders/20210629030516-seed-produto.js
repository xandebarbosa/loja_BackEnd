"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "produto", 
      [
        {
          fornecedorId: 2,
          nome: 'Jaqueta Revit Vertex Air - #1 ',
          tamanho: 'Grande',
          cor: 'Black/red',
          quantidade: 10,
          preco: 1500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fornecedorId: 2,
          nome: 'Jaqueta Revit Vertex Air - #2 ',
          tamanho: 'Média',
          cor: 'Black/red',
          quantidade: 14,
          preco: 1500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fornecedorId: 2,
          nome: 'Jaqueta Revit Vertex Air - #3 ',
          tamanho: 'Pequena',
          cor: 'Black/red',
          quantidade: 5,
          preco: 1410,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fornecedorId: 2,
          nome: 'Jaqueta Revit Vertex Air - #4 ',
          tamanho: 'Grande',
          cor: 'Black',
          quantidade: 8,
          preco: 1350,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], 
      {}
    );
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("produto", null, {});
     
  }
};
