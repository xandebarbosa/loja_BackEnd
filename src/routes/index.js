const express = require("express");
const controllerUsuario = require("../controller/usuario");
const controllerEndereco = require("../controller/endereco");
const controllerPedido = require("../controller/pedido");
const controllerProduto = require("../controller/produto");
const controllerFornecedor = require("../controller/fornecedor");
const controllerTamanho = require("../controller/tamanho");
const controllerCor = require("../controller/cor");
const controllerArquivo = require("../controller/arquivo");
const controllerCategoria = require("../controller/categoria");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const path = require('path');
const multer = require("multer"); //configurações para arquivos

const storage = multer.diskStorage({   //configurações para o local onde a imagem vai ser salvar
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
  },
  filename: function (req, file, cb) { // configurações para mudar o nome da imagem
    cb(null, Date.now()+'-'+file.originalname);
  }
})

const upload = multer({ storage: storage });

//const upload = multer({ dest: path.resolve(__dirname, '..', '..', 'uploads') }); //caminho da pasta uploads
//configurações para arquivos - dest: 'uploads/' - local no nosso projeto onde vamos salvar os arquivos, criar uma pasta na raiz do projeto
//vamos passar o caminho atraves de path, do modo que escrevemos trata independente do tipo do sistema operacional

router.post("/login", controllerUsuario.login);
//router.use(authMiddleware); //torna as rotas abaixo privadas - obrigatoriedade de autenticação

/**
 * ROTAS DE ARQUIVOS
 */
 router.get("/arquivo", controllerArquivo.listar);
 router.post("/arquivo", upload.single('arquivo'), controllerArquivo.criar);  // rota recebe um middleware chamada multer, para podermos salvar o arquivo dentro da pasta uploads
 router.delete("/arquivo/:id",controllerArquivo.deletar);

/**
 * ROTAS DE USUARIO
 */
router.get("/usuario", controllerUsuario.listar);
router.post("/usuario", controllerUsuario.criar);
router.put("/usuario/:id", controllerUsuario.alterar);
router.delete("/usuario/:id", controllerUsuario.deletar);
router.get("/usuario/autenticado", controllerUsuario.autenticado);

/**
 * ROTAS DE ENDERECO
 */
router.get("/endereco", controllerEndereco.listar);
router.post("/endereco", controllerEndereco.criar);
router.delete("/endereco/:id",controllerEndereco.deletar);

/**
 * ROTAS DE TAMANHO
 */
 router.get("/tamanho", controllerTamanho.listar);
 router.post("/tamanho", controllerTamanho.criar);
 router.delete("/tamanho/:id",controllerTamanho.deletar);

 /**
 * ROTAS DE COR
 */
  router.get("/cor", controllerCor.listar);
  router.post("/cor", controllerCor.criar);
  router.delete("/cor/:id",controllerCor.deletar);

/**
 * ROTAS DE PEDIDO
 */
router.get("/pedido",controllerPedido.listar);
router.post("/pedido", controllerPedido.criar);
router.delete("/pedido/:id", controllerPedido.deletar);
router.post("/pedido/status/:id", controllerPedido.alterarStatus);
router.post("/pedido/cancelar/:id", controllerPedido.cancelarPedido);

/**
 * ROTAS DE PRODUTO
 */
router.get("/produtos", controllerProduto.listar); //rota para listar todos os produtos
router.get("/produtos/:id", controllerProduto.show); //rota para listar um único produto
router.post("/produto", controllerProduto.criar);
router.post("/produto/buscar", controllerProduto.buscar);
router.delete("/produto/:id", controllerProduto.deletar);

/**
 * ROTAS DE FORNECEDOR
 */
router.get("/fornecedor", controllerFornecedor.listar);
router.post("/fornecedor", controllerFornecedor.criar);
router.delete("/fornecedor/:id", controllerFornecedor.deletar);

/**
 * ROTAS DE CATEGORIA
 */
router.post("/categoria", controllerCategoria.criar);
router.get("/categoria", controllerCategoria.listar);
router.get("/categoria/:id", controllerCategoria.show);
router.delete("/categoria/:id", controllerCategoria.deletar);


module.exports = router;
