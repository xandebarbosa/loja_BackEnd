const models = require("../models");

const tabelaProduto = models.Produto;

exports.listar = async (req, res) => {

    try {
        const produto = await tabelaProduto.findAll({include: 'fornecedor'});
        return res.json(produto);

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
};

exports.criar = async (req, res) => {

    try {
        //throw "erro ao criar produto";  // serve somente para testar se esta retornado erro
        const novoProduto = await tabelaProduto.create({
            nome: req.body.nome,
            quantidade: req.body.quantidade,
            preco: req.body.preco,
            fornecedorId: req.body.fornecedorId
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