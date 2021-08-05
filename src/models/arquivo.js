module.exports = (sequelize, DataTypes) => {
    const Arquivo = sequelize.define(
      "Arquivo",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        nome_original: DataTypes.STRING,
        tipo: DataTypes.STRING,
        nome: DataTypes.STRING,
        tamanho: DataTypes.NUMERIC,
        url: {   //coluna virtual dentro da tabela arquivo que concatena o servidor localhost com a coluna nome da tabela arquivo
            type: DataTypes.VIRTUAL,
            get() {
              return `http://localhost:3333/files/${this.nome}`;
            },
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: "arquivo",
      }
    );
  
Arquivo.associate = (models) =>{
    Arquivo.belongsTo(models.Produto, {
        foreignKey: 'produtoId',
        as: "produto",
    });
}
    return Arquivo;
};

