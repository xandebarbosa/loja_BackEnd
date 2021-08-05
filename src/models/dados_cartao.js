module.exports = (sequelize, DataTypes) => {
    const DadosCartao = sequelize.define(
      "dados_cartao",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        bandeira_cartao: DataTypes.STRING,
        numero_cartao: DataTypes.STRING,
        nome_completo: DataTypes.STRING,
        data_vencimento: DataTypes.STRING,
        codigo_seguranca: DataTypes.STRING,
        cpf: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: "dados_cartao",
      }
    );
  
    DadosCartao.associate = (models) =>{
        DadosCartao.belongsTo(models.Pedido, {
          foreignKey: 'pedidoId',
          as: "pedidos",
        });
        
      }
  
    return DadosCartao;
  };
