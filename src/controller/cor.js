const models = require("../models");

const tabelaCor = models.Cor;

exports.listar = async (req, res) => {
    
    try {
        const cor = await tabelaCor.findAll();
        return res.json(cor);

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
};

exports.criar = async (req, res) => {

    try {
        const novaCor = await tabelaCor.create({
            produtoId: req.body.produtoId,
            quantidade: req.body.quantidade,
            cor: req.body.cor,
        });
        return res.json(novaCor);        

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
};

exports.deletar = async (req, res) =>{

    try {
        await tabelaCor.destroy({
            where: {
                id: req.params.id
              }
        });
        return res.json({ message: "Cor deletada com sucesso!! "});    

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
};