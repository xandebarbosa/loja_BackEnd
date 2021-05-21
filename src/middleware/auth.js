const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

    const token = req.headers.token;

    if(!token){

        return res.sendStatus(401);
    }

    return jwt.verify(token, process.env.JWT_SECRET, function(erro, dados){

        if(erro){

            return res.sendStatus(401);
        }

            console.log(dados)
            return next();
    })
};

module.exports = auth;