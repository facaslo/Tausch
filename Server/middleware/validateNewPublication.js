const {validationResult} = require('express-validator');
const createPublication = require('../models/createPublication');
const responseNewPublication = require('./outAPINewPublication');

const validateNewPublication = async (req, res, next) =>{
    try{
        validationResult(req).throw()        
        // Configurar servidor
        await createPublication(
            req.user_email,
            req.body.title,
            req.body.category,
            req.body.subcategory,
            req.body.description,            
            req.body.item_status,
            req.body.exchange_for,
            req.body.file
        )

        responseNewPublication(req,res)
        return next()
    }
    catch(err){
        console.log(err)
        res.status(403).send(err)
    }
}

module.exports = {validateNewPublication}