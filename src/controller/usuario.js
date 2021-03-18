const models = require("../models");

const dbUsuario = models.Usuario;

exports.listar = async (req, res) => {
  return res.json({ mensagem: "Listar todos os usuários" });
};

exports.criar = async (req, res) => {
  return res.json({ mensagem: "Criar um novo usuário" });
};
