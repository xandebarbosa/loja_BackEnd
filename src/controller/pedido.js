const models = require("../models");

const tabelaPedido = models.Pedido;
const tabelaProduto = models.Produto;

exports.listar = async (req, res) => {

    try {
        const pedido = await tabelaPedido.findAll({include: "produtos"});
        return res.json(pedido);

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
};

exports.criar = async (req, res) => {

    try {
        const novoPedido = await tabelaPedido.create({
            usuarioId: req.body.usuarioId,
            valor: req.body.valor,
            status: req.body.status,
        });
    
        await Promise.all(
            req.body.produtos.map(async (item) => {
                Array.from({ length: item.quantidade }).map(async subtItem => {
                    const produto = await tabelaProduto.findByPk(item.id);
                    await novoPedido.addProduto(produto);
                })
            })
        )
        return res.json(novoPedido);

    } catch (error) {
        return res.json(error);
    }
};

exports.deletar = async (req, res) =>{

    try {
        await tabelaPedido.destroy({
            where: {
                id: req.params.id
              }
        });
        return res.json({ message: "Deletado com sucesso!! "});

    } catch (error) {
         return res.json({
            mensagem: error,
        });
    }
}