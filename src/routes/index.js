const express = require("express");
const controllerUsuario = require("../controller/usuario");
const controllerEndereco = require("../controller/endereco");
const controllerPedido = require("../controller/pedido");
const controllerProduto = require("../controller/produto");
const controllerFornecedor = require("../controller/fornecedor");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

router.post("/login", controllerUsuario.login);

//router.use(authMiddleware); //torna as rotas abaixo privadas - obrigatoriedade de autenticação


/**
 * ROTAS DE USUARIO
 */
router.get("/usuario", controllerUsuario.listar);
router.post("/usuario", controllerUsuario.criar);
router.put("/usuario/:id", controllerUsuario.alterar);
router.delete("/usuario/:id", controllerUsuario.deletar);

/**
 * ROTAS DE ENDERECO
 */
router.get("/endereco", controllerEndereco.listar);
router.post("/endereco", controllerEndereco.criar);
router.delete("/endereco/:id",controllerEndereco.deletar);

/**
 * ROTAS DE PEDIDO
 */
router.get("/pedido",controllerPedido.listar);
router.post("/pedido", controllerPedido.criar);
router.delete("/pedido/:id", controllerPedido.deletar);

/**
 * ROTAS DE PRODUTO
 */
router.get("/produto", controllerProduto.listar);
router.post("/produto", controllerProduto.criar);
router.delete("/produto/:id", controllerProduto.deletar);

/**
 * ROTAS DE FORNECEDOR
 */
router.get("/fornecedor", controllerFornecedor.listar);
router.post("/fornecedor", controllerFornecedor.criar);
router.delete("/fornecedor/:id", controllerFornecedor.deletar);


module.exports = router;
