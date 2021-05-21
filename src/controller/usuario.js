const models = require("../models");
const router = require("../routes");
const jwt = require("jsonwebtoken");


const tabelaUsuario = models.Usuario;

exports.login = async (req, res) => {

  try {

    const login = req.body.login;
    const senha = req.body.senha;

    const existeUsuario1 = await tabelaUsuario.findOne({ where: { login: login, senha: senha}});
    //const existeUsuario2 = tabelaUsuario.findAll({ attributes: [login == login && senha == senha]})

    if(!existeUsuario1){

      return res.json({
      message: "Usuário não existe",
      });
    }

     const token = jwt.sign({ foo: 'Alexandre', cidade: 'Bauru'},
     process.env.JWT_SECRET,
     {
       expiresIn: '1m',
     }
     );

     return res.json({ token: token });

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
     return res.json({ mensagem: "Usuario criado com sucesso!!" });

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