const {validationResult} = require('express-validator')
const editProfile = require('../models/editProfile')
//const responseEditProfile = require('../middleware/outAPIEditProfile')

const validateEditProfile = async (req, res, next) => {

    try{
        validationResult(req).throw()
        
        await editProfile(req)
        res.status(200).json({editionSuccess:true, msg:'Datos del perfil editados exitosamente.'}) 
        return next()
    }
    catch (err) {
        res.status(403).json({editionSuccess:false, data:err})
    }

}

module.exports = {validateEditProfile}