const {validationResult} = require('express-validator')

const mockValidateEditProfile = jest.createMockFromModule('../validateEditProfile')

const validateEditProfile = async (req, res, next) => {

    try{
        validationResult(req).throw()

        res.status(200).json({editionSuccess:true, msg:'Datos del perfil editados exitosamente.'}) 
        return next()
    }
    catch (err) {
        res.status(403).json({editionSuccess:false, data:err})
    }

}

mockValidateEditProfile.validateEditProfile = validateEditProfile

module.exports = mockValidateEditProfile 