const models = require("../models");

const tabelaPedido = models.Pedido;
const tabelaProduto = models.Produto;
const tabelaDadosCartao = models.dados_cartao;

/*
    * MAPA DOS STATUS
    *
    * 0: Cancelado
    * 1: Processando
    * 2: Validando pagamento
    * 3: Separando para entrega
    * 4: Saiu para entrega
    * 5: Entregue
    */

const tiposStatus = {
    0: "Cancelado",
    1: "Processando",
    2: "Validando pagamento",
    3: "Separando para entrega",
    4: "Saiu para entrega",
    5: "Entregue"
}

// status > 3 || status < 1
const tiposStatusInverso = {
    ["Cancelado"]: 0,
    ["Processando"]: 1,
    ["Validando pagamento"]: 2,
    ["Separando para entrega"]: 3,
    ["Saiu para entrega"]: 4,
    ["Entregue"]: 5,
}

exports.listar = async (req, res) => {

    try {
        const pedido = await tabelaPedido.findAll({include: ["produtos", "dados_cartao"]});
        return res.json(pedido);

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
};

exports.criar = async (req, res) => {

    /* 
     * Precisamos receber as serguintes informações no corpo da requisição:
     * - usuarioId
     * - valor
     * - produtos <Array> (quantidade, id)
    */

    try {
        // 1º Verificar se a quantidade de produtos esta disponivel

        const verificandoItems = await Promise.all(
            req.body.produtos.map(async item => {
                const quantidade = item.quantidade;
                const produtoBanco = await tabelaProduto.findByPk(item.id);
                //console.log({ produtoBanco});

                if (quantidade > produtoBanco.quantidade){
                    return {
                        resposta: true,
                        message: `O produto #${produtoBanco.nome} tem apenas ${produtoBanco.quantidade} disponível.`,
                    };
                }

                return {
                    resposta: false,
                };

            })
        );

        // [true, false, true] - array de verdadeiro ou falso
        //console.log("Verificando Items ==>",verificandoItems);
        if (verificandoItems.some((item) => item.resposta === true)) {
            //filtrando todos os items que a resposta for verdadeira
            const itemsIndisponivel = verificandoItems
                .filter((item) => item.resposta === true)  // filtrando para pegar todos que deram erro
                .map((itemProduto) => itemProduto.message); // depois pegando somente o texto passado e jogo no join abaixo

            return res.json({
                error: true,
                message: itemsIndisponivel, //.join(" - "), // join pega um array e transforma em string
            });
        }

        // TODO: Validar forma de pagamento se for cartão
        if (req.body.forma_pagamento === "cartao") {
            await tabelaDadosCartao.create({
                pedidoId: novoPedido.id,
                bandeira_cartao: req.body.dadosCartao.bandeira_cartao,
                numero_cartao: req.body.dadosCartao.numero_cartao,
                nome_completo: req.body.dadosCartao.nome_completo,
                data_vencimento: req.body.dadosCartao.data_vencimento,
                codigo_seguranca: req.body.dadosCartao.codigo_seguranca,
                cpf: req.body.dadosCartao.cpf,
            })
        }
        
        const novoPedido = await tabelaPedido.create({
            usuarioId: req.body.usuarioId,
            valor: req.body.valor,
            status: 'Processando',  //Por enquanto deixar uma valor fixo
            forma_pagamento: req.body.forma_pagamento,
            //req.body.status,
        });
    
        await Promise.all(
            req.body.produtos.map(async (item) => {
                
                    const produto = await tabelaProduto.findByPk(item.id);
                    await novoPedido.addProduto(produto, {
                        through: { quantidade: item.quantidade },
                    });
            })
        );

        // 2º retirar a quantidade desejada do estoque
        await Promise.all(
            req.body.produtos.map(async item =>{
                const produtoBanco = await tabelaProduto.findByPk(item.id);
                await tabelaProduto.update(
                    { quantidade: produtoBanco.quantidade - item.quantidade }, 
                    { where: { id: item.id }}
                );
            })
        );    

        return res.json(novoPedido);

    } catch (error) {
        //console.log(error);
        return res.json(error);
    }
};

exports.cancelarPedido = async (req, res) => {
    
    const { id } = req.params;
    
    try {
        // TODO: verificar qual status esta o pedido

        const pedido = await tabelaPedido.findByPk(id, { include: ['produtos'] });
        const statusAtual = tiposStatusInverso[pedido.status];

        if (statusAtual > 3 || statusAtual < 1) {
            return res.json({ 
                error: true,
                message: 'Seu pedido não pode ser mais cancelado!!'})
        }

        

        await Promise.all(
            pedido.produtos.map(async (item) => {
                const quantidadeEstoque = item.quantidade;
                const quantidadeItemsEstoque = item.pedido_produto.quantidade;

                await tabelaProduto.update(
                    { quantidade: quantidadeEstoque + quantidadeItemsEstoque },
                    { where: { id: item.id } }
                );
            })
        )

        await tabelaPedido.update(
            { status: tiposStatus[0] }, 
            { where: { id: id } }
        );
        
        return res.sendStatus(200); // sendStatus serve para dizer que deu certo

    } catch (error) {
        return res.json(error);
    }
}

exports.alterarStatus = async (req, res) => {
    const { id } = req.params; 
    const status = req.body.status;
     console.log(status);
    
    //TODO: validar se o req.body.status esta entre 1 -5
    // status > 1 && status < 5
    // status = 0 < 1 ou status = 15 < 5
        
    try {

        if (status < 1 || status > 5) {
            return res.json({ 
                error: false,
                message: 'Status tem que estar entre 1 e 5'
            })
            
        }

        const pedido = await tabelaPedido.update({ status: tiposStatus[status] }, { where: { id: id }});
        return res.json({ message: 'Status do pedido alterado com sucesso.' });
    } catch (error) {
        return res.json(error);
    }
}

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