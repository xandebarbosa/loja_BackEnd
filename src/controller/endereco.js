const models = require("../models");

const tabelaEndereco = models.Endereco;

exports.listar = async (req, res) => {
    
    try {
        const endereco = await tabelaEndereco.findAll({ include: 'usuario'});
        return res.json(endereco);

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
};

exports.criar = async (req, res) => {

    try {
        const novoEndereco = await tabelaEndereco.create({
            usuarioId: req.body.usuarioId,
            cep: req.body.cep,
            rua: req.body.rua,
            numero: req.body.numero,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            estado: req.body.estado,
        });
        return res.json(novoEndereco);        

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
};

exports.deletar = async (req, res) =>{

    try {
        await tabelaEndereco.destroy({
            where: {
                id: req.params.id
              }
        });
        return res.json({ message: "Endereço deletado com sucesso!! "});    

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
};