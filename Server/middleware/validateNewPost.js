const {validationResult} = require('express-validator');
// const {postUserInfoFromDBNoGoogle} = require('../models/registerUserToDatabase');
const responseNewPost = require('./outAPINewPost');

const validateNewPost = async (req, res, next) =>{
    try{
        validationResult(req).throw()
        //await postUserInfoFromDBNoGoogle(req.body, token)
        responseNewPost(req,res)
        return next()
    }
    catch(err){
        res.status(403).send(err)
    }
}

module.exports = {validateNewPost}