const {validationResult} = require('express-validator');
const responseNewPublication = require('../outAPINewPublication');

const mockNewPublication = jest.createMockFromModule('../validateNewPublication')

const validateNewPublication = (req, res, next) =>{
    try{
        validationResult(req).throw()

        responseNewPublication(req,res)
        return next()
    }
    catch(err){
        console.log(err)
        res.status(403).send(err)
    }
}

mockNewPublication.validateNewPublication = validateNewPublication

module.exports = mockNewPublication