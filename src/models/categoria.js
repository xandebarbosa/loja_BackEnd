module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define(
      "Categoria",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        nome: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: "categoria",
      }
    );
  
Categoria.associate = (models) =>{
    Categoria.hasMany(models.Produto, {  //hasMany - muitos produtos
        foreignKey: 'categoriaId',
        as: "produtos",
    });
}
  
  return Categoria;

};

