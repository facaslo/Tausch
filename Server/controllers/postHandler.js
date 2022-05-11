// Los controladores son la api que se encarga de procesar las llamadas de react y responder a las peticiones, bien sea llamando un modelo o enviando un json de respuesta
const path = require('path')
const {check, body, oneOf} = require('express-validator')
const {validateRegister} = require('../middleware/validateRegister')
const {validateLogin} = require('../middleware/validateLogin')
const {validateNewPublication} = require('../middleware/validateNewPublication')

const postRegister =[
    check('userName')
        .exists()
        .notEmpty(),
    check('password')
        .exists()
        .isStrongPassword(),
    check('email')
        .exists()
        .isEmail(),
    check('firstName')
        .exists()
        .notEmpty(),
    check('lastName')
        .exists()
        .notEmpty(),
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
    /* oneOf(// se revisa si alguno de los checks pasa la validacion
        check('email')
            .exists()
            .isEmail(),
        check('userName')
            .exists()
            .notEmpty(),
    ),*/
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

const categories = ['Tecnología', 'Ropa y accesorios', 'Deportes', 'Arte', 'Entretenimiento', 
    'Hogar', 'Servicios', 'Libros y Revistas', 'Música', 'Vehículos', 'Otros']

const subcategories = {
    'Tecnología':['Videojuegos', 'Computadores', 'Cámaras', 'Televisores', 'Celulares'],
    'Ropa y accesorios':['Formal', 'Deportiva', 'De playa', 'Casual', 'De trabajo', 'Accesorios'],
    'Deportes':['Gimnasio', 'Implementos deportivos', 'Bicicletas y movilidad'],
    'Arte':['Obras', 'Materiales', 'Afiches'],
    'Entretenimiento':['Juegos de mesa', 'Juguetes', 'Películas'],
    'Hogar':['Electrodomésticos', 'Decoración', 'Muebles', 'Jardineria'],
    'Libros y revistas':['Literatura', 'Comics', 'Revistas'],
    'Música':['Instrumentos', 'Discos'],
    'Vehículos':['Motos', 'Automóviles', 'Accesorios y herramientas', 'Repuestos y partes']
}

const itemState = ["nuevo", "usado"]

const imageExtensions = ['.webp','.vsg','.bmp', '.gif', '.jpg', '.tif', '.png']

const postNewPublication = [
    check('title')
        .exists()
        .notEmpty(),
    check('file')
        .exists()
        .notEmpty(),
    check('category')
        .exists()
        .notEmpty()
        .isIn(categories),
    body().custom((value) => {
        if(value.subcategory || value.subcategory === ''){
            if(value.subcategory !== ''){
                if(subcategories[value.category].includes(value.subcategory)){
                    return true
                }
            }
            else if(value.category === 'Servicios' || value.category === 'Otros'){
                return true
            }
        }
        return false
    }),
    check('description')
        .exists()
        .notEmpty(),    
    check('item_status')
        .exists()
        .notEmpty()
        .isIn(itemState),
    check('exchange_for')
        .exists()
        .notEmpty()
        .isIn(categories),
    (req, res, next) => {
        validateNewPublication(req, res, next)
    }
]

module.exports = {postRegister, postLogin, postNewPublication}