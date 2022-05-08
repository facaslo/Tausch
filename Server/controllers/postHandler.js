// Los controladores son la api que se encarga de procesar las llamadas de react y responder a las peticiones, bien sea llamando un modelo o enviando un json de respuesta
const {check, body} = require('express-validator')
const {validateRegister} = require('../middleware/validateRegister')
const {validateLogin} = require('../middleware/validateLogin')
const {validateNewPost} = require('../middleware/validateNewPost')

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

const categories = ['Tecnología', 'Ropa y Accesorios', 'Deportes', 'Arte', 'Entretenimiento', 
    'Hogar', 'Servicios', 'Libros y Revistas', 'Música', 'Vehículos', 'Otros']

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



const postNewPublication = [

    // email ?
    // id ?
    // titulo
    check('title')
        .exists()
        .not()
        .isEmpty(),
    // imagen (dataURI ?, que se recibe)
    // categoria
    check('category')
        .exists()
        .not()
        .isEmpty()
        .isIn(categories),
    // subcategoria
    check('subcategory') // diccionario para subcategorias ?
        .exists()
        .not()
        .isEmpty(),
    // descripcion
    check('description')
        .exists()
        .not()
        .isEmpty(),
    // fecha_post
    check('publication_date')
        .exists()
        .isDate(), // el formato predeterminado es yyyy/mm/dd, se puede cambiar (ver validator en github)
    // estado_item
    check('item_status')
        .exists()
        .not()
        .isEmpty(),
    // activa
    // check('isActive')
    //     .exists()
    //     .isBoolean(),
    // intercambio_por
    check('exchange_for')
        .exists()
        .not()
        .isEmpty(),
    // numero_propuestas
    // check('numProposal')
    //     .exists()
    //     .isNumeric(),
    (req, res, next) => {
        validateNewPost(req, res, next)
    }
]

module.exports = {postRegister, postLogin, postNewPublication}