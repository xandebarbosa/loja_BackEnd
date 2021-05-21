module.exports = (sequelize, DataTypes) => {
    const Pedido = sequelize.define(
      "Pedido",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        valor: DataTypes.INTEGER,
        status: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: "pedido",
      }
    );
  
     Pedido.associate = (models)  =>{
      Pedido.belongsTo(models.Usuario, {
        foreignKey: "usuarioId",  //posso usar o mesmo nome de foreignKey de endereco
        as: "usuarioPedido",
      });

      Pedido.belongsToMany(models.Produto, {
          foreignKey: 'pedidoId',
          as: 'produtos',
          through: 'pedido_produto'
      })
     };
  
    return Pedido;
  };