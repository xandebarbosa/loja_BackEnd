const express = require("express");

const controllerUsuario = require("../controller/usuario");

const router = express.Router();

router.get("/usuario", controllerUsuario.listar);
router.post("/usuario", controllerUsuario.criar);

module.exports = router;
