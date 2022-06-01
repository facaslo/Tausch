const {validationResult} = require('express-validator')
const responseLogin = require('../outAPILogin')

const mockValidateLogin = jest.createMockFromModule('../validateLogin')

const checkUserLogin = (req) => {

    const users = [
        {
            'userName':'prueba-userName',
            'password':'0000',
            'estado_de_cuenta':false

        },
        {
            'email':'testCorreo@gmail.com',
            'password':'O6@NsmXVJmoJ',
            'estado_de_cuenta':false
        },
        {
            'email':'becjulio@gmail.com',
            'password':'O6@NsmXVJmoJ',
            'estado_de_cuenta':true
        },
        {
            'email': 'jubedoyag@unal.edu.co',
            'password': 'O6@NsmXVJmoJ',
            'estado_de_cuenta':false
        }
    ]

    let userInfo;
    if(req.body.userName){
        userInfo = users.filter(user => user.userName === req.body.userName)
    }
    else if(req.body.email){
        userInfo = users.filter(user => user.email === req.body.email)
    }
    
    try{
        const activated = userInfo[0].estado_de_cuenta;
        const passwordCheck = req.body.password === userInfo[0].password
        return {passwordCheck, activated}
    }catch{
        return {passwordCheck:false, activated:false}
    }
    
    
}

const validateLogin = (req, res, next) =>{
    try{
        validationResult(req).throw() 
        const validCredentials = checkUserLogin(req,res);
        responseLogin(req,res, validCredentials.passwordCheck, validCredentials.activated);
        return next()
    }
    catch(err){
        res.status(403).send(err)
    }
}

mockValidateLogin.validateLogin = validateLogin

module.exports = mockValidateLogin