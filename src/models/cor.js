module.exports = (sequelize, DataTypes) => {
    const Cor = sequelize.define(
      "Cor",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        quantidade: DataTypes.INTEGER,
        cor: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: "cor",
      }
    );
  
    Cor.associate = (models) =>{
        Cor.belongsTo(models.Produto, {
          foreignKey: 'produtoId',
          as: "produto",
        });
        
      }
  
    return Cor;
};