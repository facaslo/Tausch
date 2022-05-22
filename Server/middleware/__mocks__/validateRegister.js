const {validationResult} = require('express-validator');
/* 
HAY QUE ARREGLAR LOS TESTS PARA QUE FUNCIONEN CON LA MOCK DATABASE
*/

const mock = jest.createMockFromModule('../validateRegister')

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
    console.log(validationResult(req).array())
    let result = checkAvailability(req,res)
    if(result){
        res.status(200).json({registerSuccess:true, email: req.body.email})
    }
    else{
        res.status(200).json({registerSuccess:false, emailOrUserAvailable: false})
    }
}

mock.validateRegister = validateRegister

module.exports = mock