const models = require("../models");

const tabelaCategoria = models.Categoria;
const tabelaProduto = models.Produto;

exports.listar = async (req, res) => {
    
    try {
        const categoria = await tabelaCategoria.findAll();
        return res.json(categoria);

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
};

//VAI LISTAR SOMENTE UMA CATEGORIA
exports.show = async (req, res) => {
    
    const id = req.params.id; // vai retornar qual categoria foi selecionada

    try {

        const categoria = await tabelaCategoria.findByPk(id,   //include vai listar os produtos relacionados com a categoria
            { include: [{
                model: tabelaProduto,
                as: "produtos", 
                include: ["arquivos"]
            }, ],
        }); 
        return res.json(categoria);
        
    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
}

exports.criar = async (req, res) => {
    //console.log(req.file);

    try {
    
        const categoria = await tabelaCategoria.create({
            nome: req.body.nome,
        });
        return res.json(categoria);        

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
};

exports.deletar = async (req, res) =>{

    try {
        await tabelaCategoria.destroy({
            where: {
                id: req.params.id
              }
        });
        return res.json({ message: "Categoria deletada com sucesso!! "});    

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
};