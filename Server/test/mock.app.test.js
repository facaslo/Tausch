// Aquí van las pruebas donde la base de datos no es necesaria pero si se interactua con ella
// y por lo mismo es mejor hacerle un mock

// se puede evitar una prueba poniendo .skip despues de describe o de test
const supertest = require('supertest')
const jwtGenerator = require('../utils/jwtGenerator')
const app = require('../app')

jest.mock('../middleware/validateRegister')
jest.mock('../middleware/validateLogin')
jest.mock('../middleware/validateEditProfile')
jest.mock('../middleware/validateNewOffer')

const api = supertest(app)

describe('POST /register', () => {

    test('Registro exitoso.', async () => {
        
        const newUser = {
                "userName":"testUser",
                "password":"O6@NsmXVJmoJ",
                "email":"testCorreo@gmail.com", 
                "firstName":"nombre", 
                "lastName":"apellido", 
                "age":"40",
                "phoneNumber":"3131311234",
                "facebook":"testface",
                "twitter":"@testtweet",
                "instagram":"instatest"
            }
        
        const response = await api.post('/register').send(newUser).expect(200) // responseCode = 200 OK
        expect(response.body.registerSuccess).toBe(true) // registerSuccess = true
        expect(response.body.email)
    })

    test('Registro incorrecto, usuario existente.', async () => {

        const newUser = {
                "userName":"user-julio",
                "password":"O6@NsmXVJmoJ",
                "email":"testCorreo@gmail.com", 
                "firstName":"nombre", 
                "lastName":"apellido", 
                "age":"40",
                "phoneNumber":"3131311234",
                "facebook":"testface",
                "twitter":"@testtweet",
                "instagram":"instatest"
            }
        
        const response = await api.post('/register').send(newUser).expect(200) // responseCode = 200 OK
        expect(response.body.registerSuccess).toBe(false) // registerSuccess = false
        expect(response.body.emailOrUserAvailable).toBe(false) // email o usuario no disponible
    })
    
    // afterAll(() => {
    //     server.close()
    // })

})

describe('POST /login', () => {

    test('Inicio de sesion exitoso.', async () => {
        const userLogin = {
            "email": "becjulio@gmail.com",
            "password": "O6@NsmXVJmoJ"
          }
        
        const response = await api.post('/login').send(userLogin).expect(200) // responseCode = 200 OK
        expect(response.body.loginSuccess).toBe(true) // loginSuccess = true
        expect(response.body.credentialsValidated).toBe(true) // credentialsValidated = true
        expect(response.body.isActivated).toBe(true) // icActivated = true
    })

    test('Inicio de sesion fallido, cuenta no activada.', async () => {
        const userLogin = {
            "email": "jubedoyag@unal.edu.co",
            "password": "O6@NsmXVJmoJ"
          }
        
        const response = await api.post('/login').send(userLogin).expect(200) // responseCode = 200 OK
        expect(response.body.loginSuccess).toBe(false) // loginSuccess = false
        expect(response.body.credentialsValidated).toBe(true) // credentialsValidated = true
        expect(response.body.isActivated).toBe(false) // icActivated = false
    })

    test('Inicio de sesion invalido, contraseña incorrecta.', async () => {
        const userLogin = {
            "email": "becjulio@gmail.com",
            "password": "O6@HablamosJmoJ"
          }
        
        const response = await api.post('/login').send(userLogin).expect(200) // responseCode = 200 OK
        expect(response.body.loginSuccess).toBe(false) // loginSuccess = false
        expect(response.body.credentialsValidated).toBe(false) // credentialsValidated = false
    })

})

describe('PUT /edit-profile', () => {
    
    const email = 'becjulio@gmail.com'
    const token = jwtGenerator(email)

    test('Datos correctamente editados.', async () => {

        const response = await api.put('/edit-profile').set('token', token).send({
            phoneNumber:'3213123213',
            facebook:'test-facebook',
            twitter:'test-tuiter',
            instagram:'@test-insta'
        }).expect(200)

        expect(response.body.editionSuccess).toBe(true)
        expect(response.body.msg).toBe('Datos del perfil editados exitosamente.')
    })

    test('Campo de telefono no valido.', async () => {

        const response = await api.put('/edit-profile').set('token', token).send({
            phoneNumber:'a ver paps',
            facebook:'test-facebook',
            twitter:'test-tuiter',
            instagram:'@test-insta'
        }).expect(403)

        expect(response.body.editionSuccess).toBe(false)
        expect(response.body.data.errors[0].msg).toBe('Invalid value')
        expect(response.body.data.errors[0].param).toBe('phoneNumber')
    })

})

describe('POST /new-offer', () => {

    test('Creacion de propuesta exitosa.', async () => {

        const offer = {
            "email_proponente":"becjulio@gmail.com",
            "email_receptor":"scassianor@unal.edu.co",
            "id_publicacion_receptor":47,
            "mensaje":"Este es un mensaje de prueba.",
            "lista_publicaciones":[1,2,3]
        }

        const response = await api.post('/new-offer').send(offer).expect(200)
        expect(response.body.offerSuccess).toBe(true)
        expect(response.body.msg).toBe('Oferta de trueque creada exitosamente.')

    })

    test('Exceso de caracteres en mensaje.', async () => {

        const offer = {
            'email_proponente':'becjulio@gmail.com',
            'email_receptor':'sarodriguezca@gmail.com',
            'id_publicacion_receptor':20,
            'id_publicacion_proponente':33,
            'mensaje':'mensaje-prueba-mayor200char:qwertyasdfqwertyasdfqwertyasdfqwertyasdfqwertyasdfqwertyasdfqwertyasdfqwertyasdfqwertyasdfqwertyasdfqwertyasdfqwertyasdfqwertyasdfqwertyasdfqwertyasdfqwertyasdfqwertyasdfqwertyasdfqwertyasdfqwertyasdfqwertyasdfqwertyasdfqwertyasdfqwertyasdfqwertyasdf'
        }

        const response = await api.post('/new-offer').send(offer).expect(403)
        expect(response.body.errors[0].msg).toBe('Invalid value')
        expect(response.body.errors[0].param).toBe('mensaje')

    })
})