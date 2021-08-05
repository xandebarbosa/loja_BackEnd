const { Op } = require("sequelize");
const models = require("../models");

const tabelaProduto = models.Produto;

exports.listar = async (req, res) => {

    try {
        const produto = await tabelaProduto.findAll({
            include: ["fornecedor", "arquivos", "categoria"]
        });
        return res.json(produto);

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
};

exports.show = async (req, res) => {
    const produtoId = req.params.id;

    //fazendo uma consulta no banco
    try {
        const produto = await tabelaProduto.findOne({
            where: {id: produtoId},
            include: ["tamanhos", "cores", "arquivos"]
        });

        return res.json(produto);

    } catch (error) {
        return res.json({ 
            mensagem: error,
        });
    }
}

exports.criar = async (req, res) => {

    try {
        //throw "erro ao criar produto";  // serve somente para testar se esta retornado erro
        const novoProduto = await tabelaProduto.create({
            nome: req.body.nome.toLowerCase(),  //.toLowerCase - salva o nome todo em letra minuscula
            quantidade: req.body.quantidade,
            preco: req.body.preco,
            fornecedorId: req.body.fornecedorId,
            categoriaId: req.body.categoriaId,
        });
    
        return res.json(novoProduto);

    } catch (error) {
        return res.status(500).json({
            mensagem: error,
        });
    }
};

exports.deletar = async (req, res) =>{

    try {
        await tabelaProduto.destroy({
            where: {
                id: req.params.id
              }
        });
    
        return res.json({ message: "Produto deletado com sucesso!! "});

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
    
};

exports.buscar = async (req, res) => {

    const parteProduto = req.body.parteProduto;

    try {
        const response = await tabelaProduto.findAll({ 
            where: { 
                nome: {
                    [Op.like]: `%${parteProduto.toLowerCase()}%`,
                },
            },
            include: ["fornecedor", "arquivos"], // para carregar fornecedores e arquivos
        });
        return res.json(response);

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
}