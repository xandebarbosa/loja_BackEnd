module.exports = (sequelize, DataTypes) => {
    const PedidoProduto = sequelize.define(
      "pedido_produto",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        quantidade: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: "pedido_produto",
      }
    );
  
    PedidoProduto.associate = (models)  =>{};
  
    return PedidoProduto;
  };