const models = require("../models");
const router = require("../routes");
const jwt = require("jsonwebtoken");


const tabelaUsuario = models.Usuario;

exports.autenticado = async (req, res) => {
  
  const token = req.headers.authorization.split(" ")[1];
  //metodo Split pega o texto e coloca dentro de um array, alem disso esse metodo permite a divisão da informação por aspas
  
  const decoded = jwt.decode(token); //decode metodo para descriptografar 
  
  if( decoded && decoded.id){
    
    const usuario = await tabelaUsuario.findOne({ where: { id: decoded.id}});
    return res.json(usuario);
  }

  return res.json({
    error: true,
    message: "Usuário não autenticado"
  });
}

exports.login = async (req, res) => {

  try {

    const login = req.body.login;
    const senha = req.body.senha;

    const existeUsuario = await tabelaUsuario.findOne({ where: { login: login, senha: senha}});
    
    if(!existeUsuario){

      return res.json({
        error: true,
        message: "Usuário não existe",
      });
    }

     const token = jwt.sign({ id: existeUsuario.id }, process.env.JWT_SECRET, // metodo sign cria o Token, será gravado o id do usuario
     {
       expiresIn: '8h',
     });

     return res.json({ token: token, user: existeUsuario });

  } catch (error){
    return res.json({
      mensagem: error,
    });
  }
  
};

exports.listar = async (req, res) => {

  try {
    const users = await tabelaUsuario.findAll({ include: ['enderecos', 'pedidos']});
    return res.json(users);

  } catch (error) {
      return res.json({
      mensagem: error,
      });
  }
};

exports.criar = async (req, res) => {

  try {
    const novoUsuario = await tabelaUsuario.create({
      nome: req.body.nome,
      login: req.body.usuario,
      senha: req.body.senha,
    });

    const token = jwt.sign({ id: novoUsuario.id }, process.env.JWT_SECRET, // metodo sign cria o Token, será gravado o id do usuario
      {
        expiresIn: '8h',
      });
     return res.json({ token: token, user: novoUsuario});

  } catch (error) {
      return res.json({
      mensagem: error,
      });
  }
};

exports.alterar = async (req, res) =>{

  try {
    const id = await tabelaUsuario.update({ 
      login: req.body.login }, {
      where: {id: req.params.id }
    });
    return res.json({ message: "Usuário alterado com sucesso!! "});

  } catch (error) {
    return res.json({
      mensagem: error,
      });
  }
};

exports.deletar = async (req, res) =>{

  try {
    await tabelaUsuario.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.json({ message: "Usuário deletado com sucesso!! "});

  } catch (error) {
    return res.json({
      mensagem: error,
      });
  }
}