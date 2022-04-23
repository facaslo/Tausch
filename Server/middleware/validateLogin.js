const {validationResult} = require('express-validator')
const {comparePassword} = require('../utils/hashPassword')
const getUserInfoFromDB = require('../models/getUserInfo')
const responseLogin = require('./outAPILogin')


const checkUserLogin = async (req,res) => {
    let userInfo;
    if(req.body.userName){
        userInfo = await getUserInfoFromDB(req.body.userName, null)
    }
    else if(req.body.email){
        userInfo = await getUserInfoFromDB(null, req.body.email)
    }
        
    const passwordCheck = await comparePassword(req.body.password, userInfo[0].password); 

    return passwordCheck
}

const validateLogin = async (req, res, next) =>{
    try{
        validationResult(req).throw() 
        const validCredentials = await checkUserLogin(req,res);  
        console.log(validCredentials);
        responseLogin(req,res, validCredentials);
        return next()
    }
    catch(err){
        res.status(403).send(err)
    }
}

module.exports = {validateLogin}