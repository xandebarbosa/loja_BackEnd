const models = require("../models");

const tabelaFornecedor = models.Fornecedor;

exports.listar = async (req, res) => {
    
    try {
        const fornecedores = await tabelaFornecedor.findAll();
        return res.json(fornecedores);

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
};

exports.criar = async (req, res) => {

    try {
        const novoFornecedor = await tabelaFornecedor.create({
        nome: req.body.nome,
        });
        return res.json(novoFornecedor);

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
};

exports.deletar = async (req, res) =>{

    try {
        await tabelaFornecedor.destroy({
            where: {
                id: req.params.id
              }
        });
        return res.json({ message: "Fornecedor deletado com sucesso!! "});

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
}