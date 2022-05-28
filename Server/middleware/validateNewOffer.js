const createOffer = require('../models/createOffer');
const responseNewOffer = require('./outAPINewOffer');

const validateNewOffer = async (req, res, next) =>{
    try{   
        // Configurar servidor
        await createOffer(
            req.body.email_proponente,
            req.body.email_receptor,
            req.body.id_publicacion_receptor,
            req.body.id_publicacion_proponente,
            req.body.mensaje
        )

        responseNewOffer(req,res)
        return next()
    }
    catch(err){
        console.log(err)
        res.status(403).send(err)
    }
}

module.exports = {validateNewOffer}