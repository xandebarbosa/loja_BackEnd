const models = require("../models");

const tabelaTamanho = models.Tamanho;

exports.listar = async (req, res) => {
    
    try {
        const tamanhos = await tabelaTamanho.findAll();
        return res.json(tamanhos);

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
};

exports.criar = async (req, res) => {

    try {
        const novoTamanho = await tabelaTamanho.create({
            produtoId: req.body.produtoId,
            quantidade: req.body.quantidade,
            medida: req.body.medida,
        });
        return res.json(novoTamanho);        

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
};

exports.deletar = async (req, res) =>{

    try {
        await tabelaTamanho.destroy({
            where: {
                id: req.params.id
              }
        });
        return res.json({ message: "Tamanho deletado com sucesso!! "});    

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
};