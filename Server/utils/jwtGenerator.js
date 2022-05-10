//Funcion para generar el JWT (JSON WEB TOKEN)
//Que permite reconocer si una persona hizo login valido
const jwt = require("jsonwebtoken");

//Acceder a variables de ambiente
//Se accede a la clave secreta en el archivo .env
require('dotenv').config();

//Como parametro se indica el email
//Que se almacenara en la token
//Para reconocer al usuario
function jwtGenerator(email) {
    //Definir info que va en el payload de la JWT
    //En este caso la token solo almacenara el email del usuario
    const payload = {
        user_email: email
    }

    //Retornar la JWT completa
    //Lo token tiene duracion de 1 dia
    return jwt.sign(payload,process.env.jwtSecret, {expiresIn: "1d"});
}

module.exports = jwtGenerator;