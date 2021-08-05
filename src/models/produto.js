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

        //console.table({ models });

        Produto.belongsTo(models.Fornecedor, {
          foreignKey: "fornecedorId",
          as: "fornecedor",
        }); 

        Produto.belongsTo(models.Categoria, {
          foreignKey: "categoriaId",
          as: "categoria"
        })

        Produto.belongsToMany(models.Pedido, {
          foreignKey: "produtoId",
          as: "pedidos",
          through: models.pedido_produto,
          //"pedido_produto"
        });
      
        Produto.hasMany(models.Tamanho, {
          foreignKey: "produtoId",
          as: "tamanhos"
        });
      
        Produto.hasMany(models.Cor, {
          foreignKey: "produtoId",
          as: "cores"
        });

        Produto.hasMany(models.Arquivo, {
          foreignKey: "produtoId",
          as: "arquivos"
        });
     };
  
    return Produto;
  };
  