const {validationResult} = require('express-validator')
const {postUserInfoFromDBNoGoogle} = require('../models/registerUserToDatabase')

const  validateRegister = (req, res, next) =>{
    try{
        validationResult(req).throw()
        postUserInfoFromDBNoGoogle(req.body)        
        res.send(req.body)
        return next()
    }
    catch(err){
        res.status(403).send(err)
    }
}

module.exports = {validateRegister}