const {validationResult} = require('express-validator');
const createPublication = require('../models/createPublication');
const responseNewPublication = require('./outAPINewPublication');

const validateNewPublication = async (req, res, next) =>{
    try{
        validationResult(req).throw()
        let image_path;
        let image_hash;
        // Configurar servidor
        await createPublication(
            req.title,
            req.category,
            req.subcategory,
            req.description,
            req.publication_date,
            req.iteam_status,
            req.exchange_for
        )

        responseNewPublication(req,res)
        return next()
    }
    catch(err){
        res.status(403).send(err)
    }
}

module.exports = {validateNewPublication}