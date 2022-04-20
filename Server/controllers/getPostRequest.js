// Los controladores son la api que se encarga de procesar las llamadas de react y responder a las peticiones, bien sea llamando un modelo o enviando un json de respuesta
const {check} = require('express-validator')
const {validateRegister} = require('../middleware/validateRegister')

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
    check('facebook')
        .exists()
        .not()
        .isEmpty(),
    check('twitter')
        .exists()
        .not()
        .isEmpty(),
    check('instagram')
        .exists()
        .not()
        .isEmpty(),
    (req, res, next) => {
        validateRegister(req, res, next)        
    }
]

const postLogin = (req,res) => {
    res.send('<h1> Esta es una petición post a la url /login </h1>')
}

module.exports = {postRegister, postLogin}