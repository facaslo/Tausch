const {validationResult} = require('express-validator');
const responseRegister = require('../outAPIRegister');

const mockValidateRegister = jest.createMockFromModule('../validateRegister')

const checkAvailability = (req) => {
    const users = [
        {
            'email':'becjulio@gmail.com',
            'userName':'user-julio'
        },
        {
            'email':'facaslo.99@gmail.com',
            'userName':'fabian123'
        },
        {
            'email':'jubedoyag@unal.edu.co',
            'userName':'user-prueba'
        }
    ]
    const userInfo = users.filter(user => user.email === req.body.email || user.userName === req.body.userName)
    return userInfo.length === 0
}

const validateRegister = (req, res) =>{
    validationResult(req).throw()
    let result = checkAvailability(req,res)
    if(result){
        responseRegister(req,res,true)
    }
    else{
        responseRegister(req,res,false)
    }
}

mockValidateRegister.validateRegister = validateRegister

module.exports = mockValidateRegister