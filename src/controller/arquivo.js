const models = require("../models");

const tabelaArquivo = models.Arquivo;

exports.listar = async (req, res) => {
    
    try {
        const arquivos = await tabelaArquivo.findAll();
        return res.json(arquivos);

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
};

exports.criar = async (req, res) => {
    //console.log(req.file);

    try {
    
        const arquivo = await tabelaArquivo.create({
            nome_original: req.file.originalname,
            tipo: req.file.mimetype,
            nome: req.file.filename,
            tamanho: req.file.size,
            produtoId: req.body.produtoId,
        });
        return res.json(arquivo);        

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
};

exports.deletar = async (req, res) =>{

    try {
        await tabelaArquivo.destroy({
            where: {
                id: req.params.id
              }
        });
        return res.json({ message: "Arquivo deletada com sucesso!! "});    

    } catch (error) {
        return res.json({
            mensagem: error,
        });
    }
};