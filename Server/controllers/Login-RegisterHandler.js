// Los controladores son la api que se encarga de procesar las llamadas de react y responder a las peticiones, bien sea llamando un modelo o enviando un json de respuesta
const {check} = require('express-validator')
const {validateRegister} = require('../middleware/validateRegister')
const {validateLogin} = require('../middleware/validateLogin')

const postRegister =[
    check('userName')
        .exists()
        .not()
        .isEmpty(),
    check('password')
        .exists()
        .isStrongPassword(),
    check('email')
        .exists()
        .isEmail(),
    check('firstName')
        .exists()
        .not()
        .isEmpty(),
    check('lastName')
        .exists()
        .not()
        .isEmpty(),
    check('age')
        .exists()
        .isNumeric(),
    check('phoneNumber')
        .exists()
        .isNumeric(),       
    (req, res, next) => {
        validateRegister(req, res, next)        
    }
]

const postLogin = [
    check('email')
        .exists()
        .isEmail(),
    check('password')
        .exists()
        .isStrongPassword(),
    (req, res, next) => {
        validateLogin(req, res, next)
    }
]

module.exports = {postRegister, postLogin}