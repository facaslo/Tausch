//Rutas encargada de verificar las token
//E indicar si el usuario esta loggeado
const router = require("express").Router();

//Middleware que verifica la veracidad si se tiene un token valido 
const authorization = require("../middleware/authorization");

//Modelo encargado de retornar informacion del usuario
const getUserInfoFromDB =  require("../models/getUserInfo")
const getProfileInfo = require("../models/getProfileInfo")


//Ruta para verificar JWT Token
//Cuando el cliente refresca la pagina
router.get("/is-verify",authorization, async (req,res) => {
    try{
        //Si la funcion authorization indico que el token 
        //que tiene el usuario almacenada en su navegador fue valida
        //Se envia como respuesta un true para indicar que el usuario
        //Si esta loggeado
        res.json(true);

    } catch(err){
        console.error(err.message);
        //Mensaje de error en el servidor
        res.status(500).send("Server Error");
    }
});

//Metodo para obtener el user name 
//DE un usuario a partir del valor de su token
//primero se verifica que su token sea valida
//Al ejecutar authorization, se obtiene el correo
//Del usuario dentro de la request
//Luego con ese correo se consulta la base de datos
//y se retorna el nombre de usuario
router.get("/getUserInfo",authorization,async(req, res) =>{
    try{
        const response = await getUserInfoFromDB(false,req.user_email);
        res.json(response);
    } catch(err){
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.get("/getProfileInfo",authorization,async(req, res) =>{
    try{
        const response = await getProfileInfo(req.user_email);
        res.json(response);
    } catch(err){
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;