const {validationResult} = require('express-validator');
const {postUserInfoFromDBNoGoogle} = require('../models/registerUserToDatabase');
const checkEmailOrUsername = require('../models/checkEmailOrUsername');
const responseRegister = require('./outAPIRegister');
const sendActivationEmail = require('../utils/sendEmailVerification');
const generateToken = require('../utils/generateRandomToken');

const checkAvailability = async (req,res) => {
    const userInfo = await checkEmailOrUsername(req.body.userName, req.body.email)    
    return userInfo.length === 0    
}

const  validateRegister = async (req, res, next) =>{
    try{
        validationResult(req).throw()
        let result = await checkAvailability(req,res)
        if(result){                        
            let token = await generateToken(50)
            await postUserInfoFromDBNoGoogle(req.body, token)
            await sendActivationEmail(req.body.userName, token , req.body.email)
            responseRegister(req,res,true)
        }
        else{
            responseRegister(req,res,false)
        }        
        return next()
    }
    catch(err){
        res.status(403).send(err)
    }
}

module.exports = {validateRegister}