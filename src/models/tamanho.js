module.exports = (sequelize, DataTypes) => {
    const Tamanho = sequelize.define(
      "Tamanho",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        quantidade: DataTypes.INTEGER,
        medida: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: "tamanho",
      }
    );
  
    Tamanho.associate = (models) =>{
        Tamanho.belongsTo(models.Produto, {
          foreignKey: "produtoId",
          as: "produto",
        });
        
    };
  
    return Tamanho;
  };