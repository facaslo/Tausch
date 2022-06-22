// Los controladores son la api que se encarga de procesar las llamadas de react y responder a las peticiones, bien sea llamando un modelo o enviando un json de respuesta
const path = require('path')
const {check, body, oneOf} = require('express-validator')
const {validateRegister} = require('../middleware/validateRegister')
const {validateLogin} = require('../middleware/validateLogin')
const {validateNewPublication} = require('../middleware/validateNewPublication')
const {validateNewOffer} = require('../middleware/validateNewOffer')
const {validateEditProfile} = require('../middleware/validateEditProfile')

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
    body().custom((value) => {
        if(value.email){
            if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)){
                return true
            }
        }
        if(value.userName){
            if(value.userName !== ''){
                return true
            }
        }
        throw new Error('Campo de email o usuario invalido.')
    }),
    // check('email')
    //     .exists()
    //     .isEmail(),
    check('password')
        .exists()
        .isStrongPassword(),
    (req, res, next) => {
        validateLogin(req, res, next)
    }
]

const categories = ['Tecnología', 'Ropa y accesorios', 'Deportes', 'Arte', 'Entretenimiento', 
    'Hogar', 'Servicios', 'Libros y revistas', 'Música', 'Vehículos', 'Otros']

const subcategories = {
    'Tecnología':['Videojuegos', 'Computadores', 'Cámaras', 'Televisores', 'Celulares','Otros'],
    'Ropa y accesorios':['Formal', 'Deportiva', 'De playa', 'Casual', 'De trabajo', 'Accesorios','Otros'],
    'Deportes':['Gimnasio', 'Implementos deportivos', 'Bicicletas y movilidad','Otros'],
    'Arte':['Obras', 'Materiales', 'Afiches','Otros'],
    'Entretenimiento':['Juegos de mesa', 'Juguetes', 'Películas','Otros'],
    'Hogar':['Electrodomésticos', 'Decoración', 'Muebles', 'Jardineria','Otros'],
    'Libros y revistas':['Literatura', 'Comics', 'Revistas','Otros'],
    'Música':['Instrumentos', 'Discos','Otros'],
    'Vehículos':['Motos', 'Automóviles', 'Accesorios y herramientas', 'Repuestos y partes','Otros']
}

const itemState = ["nuevo", "usado"]

//const imageExtensions = ['.webp','.svg','.bmp', '.gif', '.jpg','.jpeg', '.tif', '.png']

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
        if(value.subcategory === ''){
            if(value.category === 'Servicios' || value.category === 'Otros'){
                return true
            }
        }
        if(value.subcategory){
            if(value.subcategory !== ''){
                if(subcategories[value.category].includes(value.subcategory)){
                    return true
                }
            }
        }
        throw new Error('Campo de subcategoria invalido.')
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

// const offerState = ["en espera","aceptada","rechazada","concluida"]

const postNewOffer = [
    check('mensaje')
        .exists()
        .isLength({min:0, max:200}),
    (req, res, next) => {
        validateNewOffer(req, res, next)
    }
]

const postEditProfile = [
    /*check('phoneNumber')
        .exists()
        .isNumeric(),
    check('facebook')
        .exists(),
    check('instagram')
        .exists(),
    check('twitter')
        .exists(),*/
    
    (req, res, next) => {
       
        validateEditProfile(req, res, next)
    }
]

module.exports = {postRegister, postLogin, postNewPublication, postNewOffer, postEditProfile}