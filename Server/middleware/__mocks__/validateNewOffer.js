const {validationResult} = require('express-validator');
const responseNewOffer = require('../outAPINewOffer');

mockValidateNewOffer = jest.createMockFromModule('../validateNewOffer')

const validateNewOffer = async (req, res, next) =>{
    try{   
        validationResult(req).throw()
        

        responseNewOffer(req,res)
        return next()
    }
    catch(err){
        res.status(403).send(err)
    }
}

mockValidateNewOffer.validateNewOffer = validateNewOffer

module.exports = mockValidateNewOffer