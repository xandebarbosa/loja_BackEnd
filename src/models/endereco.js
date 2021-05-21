module.exports = (sequelize, DataTypes) => {
  const Endereco = sequelize.define(
    "Endereco",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cep: DataTypes.STRING,
      rua: DataTypes.STRING,
      numero: DataTypes.STRING,
      bairro: DataTypes.STRING,
      cidade: DataTypes.STRING,
      estado: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "endereco",
    }
  );

   Endereco.associate = (models)  =>{
    Endereco.belongsTo(models.Usuario, {
      foreignKey: "usuarioId",
      as: "usuario",
    });
   };

  return Endereco;
};
