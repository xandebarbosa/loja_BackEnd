module.exports = (sequelize, DataTypes) => {
    const Produto = sequelize.define(
      "Produto",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        nome: DataTypes.STRING,
        quantidade: DataTypes.INTEGER,
        preco: DataTypes.DOUBLE,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: "produto",
      }
    );
  /*
 
  */
     Produto.associate = (models)  =>{
          Produto.belongsTo(models.Fornecedor, {
          foreignKey: "fornecedorId",
          as: "fornecedor",
        }); 

        Produto.belongsToMany(models.Pedido, {
          foreignKey: "produtoId",
          as: "pedidos",
          through: "pedido_produto",
        });
      
      
     };
  
    return Produto;
  };
  