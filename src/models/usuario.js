module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: DataTypes.STRING,
      login: DataTypes.STRING,
      senha: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "usuario",
    }
  );

  Usuario.associate = (models) =>{
    Usuario.hasMany(models.Endereco, {
      foreignKey: 'usuarioId',
      as: "enderecos",
    });
    Usuario.hasMany(models.Pedido, {
      foreignKey:'usuarioId',
      as: "pedidos",
    })
  }

  return Usuario;
};
