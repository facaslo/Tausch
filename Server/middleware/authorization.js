//Middleware En donde se ve si el usuario tiene una token
//Valida actualmente guardada en su navegador

//Acceder a libreria JWT
const jwt = require("jsonwebtoken");

//Acceder a la clave secreta que hace parte de los token
require("dotenv").config();

//Sirve para verificar si la token es valida
//ver si el usuario tiene token
module.exports = async(req, res, next) => {
    try{
        //1. Desesctructurar el token
        //La token se recibe por el header del request
        //Aqui se accede a el valor de LocalStorage donde esta la token
        const jwtToken = req.header("token");

        //Verificar si existe el token
        //Si no existe, decir que no esta autorizado
        if (!jwtToken){
            return res.status(403).json("El usuario no tiene Token");
        }

        //Verificar si la token es valida y no inventada
        //Si es true, retorna el payload(Datos que contiene la token)
        //que puede ser utilizado luego
        const payload = jwt.verify(jwtToken,process.env.jwtSecret);

        //En este caso, da el user_email del usuario que hace el request
        req.user_email = payload.user_email;
        //Pasar al siguiente middleware
        next();

    } catch(err){
        console.error(err.message);
        return res.status(403).json("Error al intentar verificar la token");
    }


};