const {validationResult} = require('express-validator');
const createOffer = require('../models/createOffer');
const responseNewOffer = require('./outAPINewOffer');

const validateNewOffer = async (req, res, next) =>{
    try{   
        validationResult(req).throw()
        // Configurar servidor
        await createOffer(
            req.body.email_proponente,
            req.body.email_receptor,
            req.body.id_publicacion_receptor,
            req.body.mensaje,
            req.body.lista_publicaciones
        )

        responseNewOffer(req,res)
        return next()
    }
    catch(err){
        res.status(403).send(err)
    }
}

module.exports = {validateNewOffer}